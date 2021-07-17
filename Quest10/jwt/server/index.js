import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

import docsRouter from './src/routes/docs.js';
import authRouter from './src/routes/auth.js';

const index = express();
index.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

index.use(logger('dev'));
index.use(express.json());
index.use(cookieParser());

index.use('/v1/docs', docsRouter);
index.use('/v1/auth', authRouter);

index.use(notFound);
index.use(errorHandler);

const port = process.env.PORT || '8000';
index.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default index;
