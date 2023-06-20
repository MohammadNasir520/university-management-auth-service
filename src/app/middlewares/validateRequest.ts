import { AnyZodObject } from 'zod';

import { NextFunction, Request, Response } from 'express';

const validateRequest =
  (Schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
