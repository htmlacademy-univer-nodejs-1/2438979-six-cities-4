import { Container } from 'inversify';
import { UserService } from '../modules/user/user-service.interface.js';
import { OfferService } from '../modules/offer/offer-service.interface.js';
import { Config, RestConfig, RestSchema } from '../rest/config/index.js';
import { DatabaseClient } from '../rest/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../rest/database-client/mongo.database-client.js';
import { DefaultUserService } from '../modules/user/default-user.service.js';
import { DefaultOfferService } from '../modules/offer/default-offer.service.js';
import { Component } from '../types/index.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from '../modules/user/user.entity.js';
import { OfferEntity, OfferModel } from '../modules/offer/offer.entity.js';
import { Logger, PinoLogger } from '../rest/logger/index.js';

export const createCliContainer = (): Container => {
  const container = new Container();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  return container;
};
