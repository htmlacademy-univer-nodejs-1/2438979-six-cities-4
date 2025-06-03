import chalk from 'chalk';
import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { Command } from './command.js';
import { createReadStream } from 'node:fs';
import { createCliContainer } from '../cli.container.js';
import { UserService } from '../../modules/user/user-service.interface.js';
import { OfferService } from '../../modules/offer/offer-service.interface.js';
import { Config, RestSchema } from '../../rest/config/index.js';
import { DatabaseClient } from '../../rest/database-client/database-client.interface.js';
import { Component } from '../../types/index.js';
import { getMongoURI } from '../../lib/utils/database/get-mongo-uri.js';
import { CreateUserDto } from '../../modules/user/index.js';
import { CreateOfferDto } from '../../modules/offer/index.js';
import { getOfferFromTsv } from '../../lib/utils/tsv/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(filePath?: string): Promise<void> {
    if (!filePath) {
      console.log(chalk.red('Путь к TSV-файлу не указан.'));
      return;
    }

    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Файл не найден: ${fullPath}`);
    }

    const container = createCliContainer();
    const userService = container.get<UserService>(Component.UserService);
    const offerService = container.get<OfferService>(Component.OfferService);
    const config = container.get<Config<RestSchema>>(Component.Config);
    const databaseClient = container.get<DatabaseClient>(Component.DatabaseClient);

    const mongoUri = getMongoURI(
      config.get('DB_USER'),
      config.get('DB_PASSWORD'),
      config.get('DB_HOST'),
      config.get('DB_PORT'),
      config.get('DB_NAME')
    );

    await databaseClient.connect(mongoUri);

    const stream = createReadStream(fullPath, { encoding: 'utf-8' });
    const readlineInterface = readline.createInterface({ input: stream });

    console.log(chalk.cyan(`Начало импорта предложений из файла: ${filePath}`));

    for await (const line of readlineInterface) {
      if (!line.trim()) {
        continue;
      }
      const offer = getOfferFromTsv(line);

      const authorDto: CreateUserDto = {
        name: offer.author.name,
        email: offer.author.email,
        avatar: offer.author.avatar,
        password: offer.author.password,
        type: offer.author.type
      };

      const author = await userService.findOrCreate(authorDto, config.get('SALT'));

      const offerDto: CreateOfferDto = {
        title: offer.title,
        description: offer.description,
        publicationDate: offer.publicationDate,
        city: offer.city,
        preview: offer.preview,
        photos: offer.photos,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        rating: offer.rating,
        type: offer.type,
        numberOfRooms: offer.numberOfRooms,
        numberOfGuests: offer.numberOfGuests,
        rentalCost: offer.rentalCost,
        facilities: offer.facilities,
        authorId: author.id,
        numberOfComments: 0,
        coordinates: offer.coordinates
      };

      await offerService.create(offerDto);

      console.log(chalk.magenta(`Импортировано предложение ${offer.author.name} из города: ${offer.city}`));
    }

    await databaseClient.disconnect();
  }
}
