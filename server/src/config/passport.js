import httpStatus from "http-status";
import { PrismaClient } from "@prisma/client";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import ApiError from "../utils/ApiError";
import { exclude } from "../utils/exclude";
import config from "./config";
import { tokenTypes } from "./tokens";

const prisma = new PrismaClient();

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Token Type");
    }
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return done(null, false);
    }
    done(null, exclude(user, "password"));
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
