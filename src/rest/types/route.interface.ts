import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from './http-method.js';
import { Middleware } from '../middlewares/middleware.interface.js';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
