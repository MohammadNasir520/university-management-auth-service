"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const paginationHelper_1 = require("../../helpers/paginationHelper");
// service
const createSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterTitleCoderMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'invalid semester Code');
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    return result;
});
const getAllSemesters = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculationPagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield academicSemester_model_1.AcademicSemester.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemester_model_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findById(id);
    console.log('id', id, 'result', result);
    return result;
});
const updateSemester = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.title &&
        payload.code &&
        academicSemester_constant_1.academicSemesterTitleCoderMapper[payload.title] !== payload.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'invalid semester Code');
    }
    const result = yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: id }, {
        $set: payload,
    }, { upsert: true, new: true });
    return result;
});
const deleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndDelete(id);
    return result;
});
exports.AcademicSemesterService = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
