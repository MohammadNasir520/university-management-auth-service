import { Schema, model } from 'mongoose';

import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemister.interface';

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    tile: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<IAcademicSemester, AcademicSemesterModel>(
  'User',
  academicSemesterSchema
);
