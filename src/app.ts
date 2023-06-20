import express, { Application } from 'express';

import cors from 'cors';
import globalErrorHandlar from './app/middlewares/globalErrorHandlar';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemister/AcademicSemester.route';

// import ApiError from './errors/ApiError'

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/', AcademicSemesterRoutes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   await Promise.reject(new Error('unhandled Promise Rejection'))
// })

//global error handling
app.use(globalErrorHandlar);

// app.get('/', async (req: Request, res: Response) => {
//   res.send('university management server is running')
// })

export default app;
