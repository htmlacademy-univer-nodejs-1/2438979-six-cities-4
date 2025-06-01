import { Logger } from '../rest/logger/index.js';
import { Config, RestSchema } from '../rest/config/index.js';
import { Component } from '../types/component.js';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from '../rest/database-client/index.js';
import { getMongoURI } from '../utils/database/index.js';

@injectable()
export class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {}

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`PORT from environment: ${this.config.get('PORT')}`);
    await this._establishDatabaseConnection();
  }

  private async _establishDatabaseConnection() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(mongoUri);
  }
}
