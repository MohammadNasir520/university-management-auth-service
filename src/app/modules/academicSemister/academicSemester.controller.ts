import { RequestHandler } from 'express';

import { AcademicSemesterService } from './acdemicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    // await createUserZodSchema.parseAsync(req)

    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'academicSemester created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
