import jwt from "jsonwebtoken";
import moment, { Moment } from "moment";
import { PrismaClient } from "@prisma/client";

import config from "../config/config";
import { tokenTypes } from "../config/tokens";

const prisma = new PrismaClient();

/**
 * Generate token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    type,
    sub: userId,
    exp: expires.unix(),
    iat: moment().unix(),
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await prisma.tokens.create({
    data: {
      type,
      token,
      userId: userId,
      expires: expires.toDate(),
    },
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await prisma.tokens.findFirst({ where: { token, type, user: payload.sub } });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, "days");
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export default {
  saveToken,
  verifyToken,
  generateToken,
  generateAuthTokens,
};
