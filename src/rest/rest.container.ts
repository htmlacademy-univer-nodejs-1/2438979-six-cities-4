import { Container } from 'inversify';
import { Application } from './application.js';
import { Component } from '../types/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../rest/database-client/index.js';
import { Logger, PinoLogger } from '../rest/logger/index.js';
import { Config, RestConfig, RestSchema } from '../rest/config/index.js';

export function createRestAppContainer() {
  const restAppContainer = new Container();
  restAppContainer.bind<Application>(Component.RestApplication).to(Application).inSingletonScope();
  restAppContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restAppContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restAppContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  return restAppContainer;
}
