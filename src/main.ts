import 'reflect-metadata';
import { Application } from './rest/index.js';
import { Component } from './types/index.js';
import { Container } from 'inversify';
import { createRestAppContainer } from './rest/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';

async function bootstrap() {
  const container = Container.merge(
    createRestAppContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const application = container.get<Application>(Component.RestApplication);
  await application.init();
}

bootstrap();
