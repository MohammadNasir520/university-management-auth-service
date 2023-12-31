import { Model } from 'mongoose';
export type month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: string;
  code: '01' | '02' | '03';
  startMonth: month;
  endMonth: month;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilters = { searchTerm?: string };
