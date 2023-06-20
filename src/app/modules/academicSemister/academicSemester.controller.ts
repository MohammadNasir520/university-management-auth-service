import { NextFunction, Request, Response } from 'express';

import { AcademicSemesterService } from './acdemicSemester.service';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academicSemester created successfully',
      data: result,
    });
    next();
  }
);
export const AcademicSemesterController = {
  createSemester,
};
