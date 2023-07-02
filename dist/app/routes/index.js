'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/user/user.route');
const AcademicSemester_route_1 = require('../modules/academicSemister/AcademicSemester.route');
const academicFaculty_route_1 = require('../modules/academicFaculty/academicFaculty.route');
const academicDepartment_routes_1 = require('../modules/academicDepartment/academicDepartment.routes');
const student_route_1 = require('../modules/student/student.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemester_route_1.AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFaculty_route_1.AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartment_routes_1.AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: student_route_1.StudentsRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
