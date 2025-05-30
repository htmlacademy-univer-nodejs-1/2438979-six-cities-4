import { Logger } from '../rest/logger/index.js';
import { Config, RestSchema } from '../rest/config/index.js';
import { Component } from '../types/component.js';
import { inject, injectable } from 'inversify';

@injectable()
export class Application {
  constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.Config) private readonly config: Config<RestSchema>,
  ){ }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`PORT from envinonment: ${this.config.get('PORT')}`);
  }
}
