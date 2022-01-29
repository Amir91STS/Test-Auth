import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync";
import userService from "../services/user.service";
import tokenService from "../services/token.service";
import authService from "../services/auth.service";
import otpService from "../services/otp.service";

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const otpCode = await otpService.createOtpCode(user.id);
  // Send OTP Code to User By Email (Call Email service);
  res.status(httpStatus.CREATED).send({ user, code: otpCode.code });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  const otpCode = await otpService.createOtpCode(user.id);
  // Send OTP Code to User By Email (Call Email service);
  res.send({ user, code: otpCode.code });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { email, code } = req.body;
  const user = await authService.verifyOtp(email, code);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export default { register, login, verifyOtp };
