import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;

/**const obj = {
  name: 'John',
  age: 25,
  city: 'New York',
};

const values = Object.values(obj);
console.log(values);
// Output: ['John', 25, 'New York']
 */
