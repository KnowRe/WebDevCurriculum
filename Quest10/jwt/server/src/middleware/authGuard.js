import { SessionService } from '../service/session.js';
import { deleteCookie } from './cookie.js';

export const authGuard = async (req, res, next) => {
  if (Reflect.has(req.cookies, 'sid')) {
    const sid = Reflect.get(req.cookies, 'sid');
    if (await SessionService.findSessionBySid(sid)) {
      return next();
    } else {
      deleteCookie(req, res, next);
    }
  }
  res.status(401).json();
};
