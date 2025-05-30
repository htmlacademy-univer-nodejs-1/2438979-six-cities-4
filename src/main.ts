import 'reflect-metadata';
import { Application } from './rest/index.js';
import { Logger, PinoLogger } from './rest/logger/index.js';
import { Config, RestConfig, RestSchema } from './rest/config/index.js';
import { Component } from './types/index.js';
import { Container } from 'inversify';

async function bootstrap() {
  const container = new Container();
  container.bind<Application>(Component.RestApplication).to(Application).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<Application>(Component.RestApplication);
  await application.init();
}

bootstrap();
