import express from 'express';
import { AuthController } from '../controller/auth.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/whoami', verifyToken, AuthController.whoami);

export default router;
