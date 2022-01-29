import cors from "cors";
import path from "path";
import helmet from "helmet";
import logger from "morgan";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import compression from "compression";
import cookieParser from "cookie-parser";

import appRoutes from "./routes";
import ApiError from "./utils/ApiError";
import { jwtStrategy } from "./config/passport";
import { errorConverter, errorHandler } from "./middlewares/error";

const app = express();
const env = process.env.NODE_ENV || "development";

app.use(cors({ origin: "*" }));
app.options("*", cors());

app.use(helmet());
app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/v1", appRoutes);

/* GET home page. */
app.get("/api/status", function (req, res) {
  return res.json("Ready");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
