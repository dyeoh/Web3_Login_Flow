import express from "express";
import * as controller from "../services/users/controller";
import jwt from "express-jwt";
import config from "../utils/jwt-config";

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route("/").get(controller.find);
userRouter.route("/register").post(controller.create);
userRouter.route("/login").post(controller.login);
userRouter.route("/username").patch(jwt(config), controller.setName);

export default userRouter;
