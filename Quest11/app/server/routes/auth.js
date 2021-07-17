import express from 'express';
import { AuthController } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/login', AuthController.login);
authRouter.get('/signup', AuthController.signup);

export default authRouter;
