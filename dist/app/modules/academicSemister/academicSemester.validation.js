"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidation = void 0;
const zod_1 = require("zod");
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
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        //
        title: zod_1.z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'title is required',
        }),
        year: zod_1.z.string({ required_error: 'year must be number and required' }),
        code: zod_1.z.enum(['01', '02', '03']),
        startMonth: zod_1.z.enum([...academicSemesterMonths], {
            required_error: 'Start Month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemesterMonths], {
            required_error: 'end Month is required',
        }),
        //
    }),
});
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'title is required',
        })
            .optional(),
        year: zod_1.z
            .string({ required_error: 'year must be number and required' })
            .optional(),
        code: zod_1.z.enum(['01', '02', '03']).optional(),
        startMonth: zod_1.z
            .enum([...academicSemesterMonths], {
            required_error: 'Start Month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemesterMonths], {
            required_error: 'end Month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided neither nor',
});
exports.academicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
