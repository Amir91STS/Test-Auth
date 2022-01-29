import httpStatus from "http-status";
import { PrismaClient } from "@prisma/client";

import userService from "./user.service";
import ApiError from "../utils/ApiError";
import tokenService from "./token.service";
import { tokenTypes } from "../config/tokens";
import { exclude } from "../utils/exclude";
import moment from "moment";

const prisma = new PrismaClient();

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUser = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isPasswordMatch(user.password, password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return exclude(user, "password");
};

/**
 * Verify with email and code
 * @param {string} email
 * @param {number} code
 * @returns {Promise<User>}
 */
const verifyOtp = async (email, code) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isOtpCodeMatch(user.id, code))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect otp code!");
  }
  const updatedUser = await prisma.user.update({ where: { id: user.id }, data: { last_login: moment().toDate() } });
  return exclude(updatedUser, "password");
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await prisma.tokens.findFirst({ where: { token: refreshToken, type: tokenTypes.REFRESH } });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default {
  logout,
  loginUser,
  verifyOtp,
  refreshAuth,
};
