import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCoderMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemister.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

// service

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCoderMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const academicSemesterSearchableFields = ['title', 'code', 'year'];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculationPagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  console.log('id', id, 'result', result);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCoderMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    {
      $set: payload,
    },
    { upsert: true, new: true }
  );

  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
