import express from 'express';
import * as controller from '../services/users/controller';

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);
userRouter.route('/').post(controller.create);

export default userRouter;