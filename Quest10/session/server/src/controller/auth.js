import { UserService } from '../service/auth.js';
import { SessionService } from '../service/session.js';
import { deleteCookie } from '../middleware/cookie.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { id, password } = req.body;
      const user = await UserService.findUser(id);
      if (user.password === password) {
        const sid = await SessionService.createSession(id);
        res.cookie('sid', sid, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return res.status(200).json({
          id: id,
        });
      }
      return res.status(401).json({});
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      await SessionService.removeSessionBySid(req.sid);
      deleteCookie(req, res, next);
    } catch (e) {
      next(e);
    }
  }

  static async whoami(req, res, next) {
    try {
      if (req.sid) {
        const session = await SessionService.findSessionBySid(req.sid);
        if (session) {
          return res.status(200).json({ id: session.id });
        } else {
          deleteCookie(req, res, next);
        }
      }
      deleteCookie(req, res, next);
    } catch (e) {
      next(e);
    }
  }
}
