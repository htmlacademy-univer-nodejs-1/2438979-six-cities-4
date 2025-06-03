import { Container } from 'inversify';
import { Application } from './application.js';
import { Component } from '../types/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../rest/database-client/index.js';
import { Logger, PinoLogger } from '../rest/logger/index.js';
import { Config, RestConfig, RestSchema } from '../rest/config/index.js';
import { AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter } from '../rest/index.js';
import { HttpErrorExceptionFilter } from '../rest/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from '../rest/transform/path-transformer.js';

export function createRestAppContainer() {
  const restAppContainer = new Container();
  restAppContainer.bind<Application>(Component.RestApplication).to(Application).inSingletonScope();
  restAppContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restAppContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restAppContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restAppContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restAppContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restAppContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restAppContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();
  return restAppContainer;
}
