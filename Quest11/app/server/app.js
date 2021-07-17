import express from 'express';
import cookieParser from 'cookie-parser';
import { errorLogger, errorResponder, failSafeHandler } from './middleware/error.js';
import authRouter from './routes/auth.js';
import Logger from './utils/logger.js';
import morganMiddleware from './utils/morgan.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

app.use('/v1/auth', authRouter);

//error handler
app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);

export default app;
