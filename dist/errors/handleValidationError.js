"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation Error',
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
/**const obj = {
  name: 'John',
  age: 25,
  city: 'New York',
};

const values = Object.values(obj);
console.log(values);
// Output: ['John', 25, 'New York']
 */
