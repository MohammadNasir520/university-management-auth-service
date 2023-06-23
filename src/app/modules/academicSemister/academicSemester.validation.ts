import { z } from 'zod';

// // request validation
// // body -->object
// // data -->object

const academicSemesterMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    //
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'title is required',
    }),

    year: z.string({ required_error: 'year must be number and required' }),

    code: z.enum(['01', '02', '03']),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...[]], {
      required_error: 'Start Month is required',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...[]], {
      required_error: 'end Month is required',
    }),
    //
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(['Autumn', 'Summer', 'Fall'], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({ required_error: 'year must be number and required' })
        .optional(),
      code: z.enum(['01', '02', '03']).optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...[]], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...[]], {
          required_error: 'end Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided neither nor',
    }
  );

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
