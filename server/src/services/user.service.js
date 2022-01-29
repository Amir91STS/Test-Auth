import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { PrismaClient } from "@prisma/client";

import ApiError from "../utils/ApiError";
import { exclude } from "../utils/exclude";

const prisma = new PrismaClient();

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const foundUser = await prisma.user.findUnique({ where: { email: userBody.email } });
  if (foundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const newUser = { ...userBody, password: await bcrypt.hash(userBody.password, 8) };
  const createdUser = await prisma.user.create({ data: newUser });
  return exclude(createdUser, "password");
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async (userPassword, password) => {
  return bcrypt.compare(password, userPassword);
};

/**
 * Check if otp code matches the user's code
 * @param {string} code
 * @param {number} userId
 * @returns {Promise<boolean>}
 */
const isOtpCodeMatch = async (userId, code) => {
  const otpCodes = await prisma.userOtp.findMany({ where: { userId }, orderBy: { expires: "desc" } });
  const lastOtpCode = otpCodes.length > 0 ? otpCodes[0] : null;

  return lastOtpCode && lastOtpCode.code === code;
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  isPasswordMatch,
  isOtpCodeMatch,
};
