import express from "express";
import passport from "passport";

import userController from "../../controllers/user.controller";

const router = express.Router();

router.route("/profile").get(passport.authenticate("jwt", { session: false }), userController.profile);

export default router;
