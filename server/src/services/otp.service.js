import moment from "moment";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Save a token
 * @param {number} userId
 * @returns {Promise<UserOtp>}
 */
const createOtpCode = async (userId) => {
  const code = Math.floor(Math.random() * 90000) + 10000;
  const otpCodeExpires = moment().add(2, "minutes");

  return prisma.userOtp.create({ data: { code, userId, expires: otpCodeExpires.toDate() } });
};

export default { createOtpCode };
