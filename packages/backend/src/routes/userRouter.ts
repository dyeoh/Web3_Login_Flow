import express from "express";
import * as controller from "../services/users/controller"

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);

export default userRouter;