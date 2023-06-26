"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'invalid Id',
        errorMessages: errors,
    };
};
exports.handleCastError = handleCastError;
