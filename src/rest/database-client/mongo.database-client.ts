import { inject, injectable } from 'inversify';
import { Logger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import mongoose, { Mongoose } from 'mongoose';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: Mongoose | null = null;
  private isConnected: boolean = false;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  private async _connectWithRetries(uri: string): Promise<Mongoose> {
    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to database with attempt number ${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }
    this.logger.info('Trying to connect to MongoDB...');
    this.mongoose = await this._connectWithRetries(uri);
    this.isConnected = true;
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Database connection not established.');
    }
    await this.mongoose?.disconnect();
    this.mongoose = null;
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
