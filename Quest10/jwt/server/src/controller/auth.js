import { CONFIG } from '../../config.js';
import { UserService } from '../service/auth.js';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { id, password } = req.body;
      const user = await UserService.findUser(id);
      if (user.password === password) {
        const token = jwt.sign(
          {
            id: id,
          },
          CONFIG.secretKey,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).json({
          accessToken: token,
        });
      }
      return res.status(401).json({ error: 'invalid user' });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  static async whoami(req, res, next) {
    try {
      res.status(200).json({ id: req.userId });
    } catch (e) {
      next(e);
    }
  }
}
