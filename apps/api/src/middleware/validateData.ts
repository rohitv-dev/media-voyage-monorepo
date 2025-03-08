import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
        const errorMessages = err.errors.map((error) => ({ message: error.message, path: error.path }));
        res.status(400).json({ ok: false, message: errorMessages });
      } else {
        res.status(400).json(`${err}`);
      }
    }
  };
}
