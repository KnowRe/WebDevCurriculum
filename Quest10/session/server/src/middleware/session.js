import { SessionService } from '../service/session.js';

export const session = async (req, res, next) => {
  if (Reflect.has(req.cookies, 'sid')) {
    const sid = Reflect.get(req.cookies, 'sid');
    const session = await SessionService.findSessionBySid(sid);
    if (session) {
      req.sid = sid;
      req.user = session.id;
      return next();
    } else {
      res.clearCookie('sid');
    }
  }
  next();
};
