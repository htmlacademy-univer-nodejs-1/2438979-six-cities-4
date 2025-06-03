import { Logger } from './logger/index.js';
import { Config, RestSchema } from './config/index.js';
import { Component } from '../types/component.js';
import { inject, injectable } from 'inversify';
import { DatabaseClient } from './database-client/index.js';
import { getMongoURI } from '../lib/utils/database/index.js';
import express, { Express } from 'express';
import { Controller, ExceptionFilter } from '../rest/index.js';
import { ParseTokenMiddleware } from '../rest/middlewares/parse-token.middleware.js';

@injectable()
export class Application {
  private server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`PORT from environment: ${this.config.get('PORT')}`);
    await this._establishDatabaseConnection();

    await this._initMiddleware();
    this.logger.info('App-level middleware initialized');

    await this._initControllers();
    this.logger.info('Controllers initialized');

    await this._initExceptionFilters();
    this.logger.info('Exception filters initialized');

    await this._initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
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

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initExceptionFilters() {
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
  }
}
