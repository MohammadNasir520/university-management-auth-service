import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCoderMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicSemister.interface';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCoderMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
};
