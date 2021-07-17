import Logger from '../utils/logger.js';

export function errorLogger(error, req, res, next) {
  Logger.error(error);
  next(error);
}

export function errorResponder(error, req, res, next) {
  if (error.type === 'redirect') res.redirect('/error');
  else if (error.type === 'time-out') res.status(408).send(error);
  else next(error);
}

export function failSafeHandler(error, req, res, next) {
  res.status(500).send(error);
}
