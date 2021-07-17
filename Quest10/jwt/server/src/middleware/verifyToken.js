import jwt from 'jsonwebtoken';
import { CONFIG } from '../../config.js';

export const verifyToken = (req, res, next) => {
  try {
    const token = Reflect.get(req.headers, 'authorization');
    const verified = jwt.verify(token, CONFIG.secretKey);
    if (verified) {
      req.userId = verified.id;
      next();
    } else {
      res.status(401).json({ error: 'unauthorized' });
    }
  } catch (e) {
    res.status(401).json({ error: 'expired' });
  }
};
