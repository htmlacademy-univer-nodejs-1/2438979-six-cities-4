import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { HttpError } from '../errors/http-error.js';
import { createErrorObject } from '../../lib/utils/shared/create-error-object.js';
import { ApplicationError } from '../types/application-error.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
