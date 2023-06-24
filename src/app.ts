import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import globalErrorHandlar from './app/middlewares/globalErrorHandlar';
import routes from './app/routes';
import httpStatus from 'http-status';
import { generatedFacultyId } from './app/modules/user/user.utils';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use('/api/v1/', routes);

app.use(globalErrorHandlar);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'route not found',
      },
    ],
  });
  next();
});

const testId = async () => {
  const testId = await generatedFacultyId();
  console.log(testId);
};
testId();
export default app;
