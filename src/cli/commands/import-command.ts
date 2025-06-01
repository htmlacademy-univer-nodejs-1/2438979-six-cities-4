import chalk from 'chalk';
import readline from 'node:readline';
import fs from 'node:fs';
import path from 'node:path';
import { Command } from './command.js';
import { City, HousingType, Facility } from '../../types/offer.js';
import { UserType } from '../../types/user.js';
import { createReadStream } from 'node:fs';
import { createCliContainer } from '../cli.container.js';
import { UserService } from '../../modules/user/user-service.interface.js';
import { OfferService } from '../../modules/offer/offer-service.interface.js';
import { Config, RestSchema } from '../../rest/config/index.js';
import { DatabaseClient } from '../../rest/database-client/database-client.interface.js';
import { Component } from '../../types/index.js';
import { getMongoURI } from '../../utils/database/mongo-utils.js';
import { CreateUserDto } from '../../modules/user/index.js';
import { CreateOfferDto } from '../../modules/offer/index.js';

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
      const [
        title, description, publicationDate, city, preview,
        photos, isPremium, isFavorite, rating, type,
        numberOfRooms, numberOfGuests, rentalCost, facilities,
        authorName, authorEmail, authorAvatar, authorPassword, authorType,
        latitude, longitude
      ] = line.split('\t');

      const authorDto: CreateUserDto = {
        name: authorName,
        email: authorEmail,
        avatar: authorAvatar,
        password: authorPassword,
        type: authorType as UserType
      };

      const author = await userService.findOrCreate(authorDto, config.get('SALT'));

      const offerDto: CreateOfferDto = {
        title: title,
        description: description,
        publicationDate: new Date(publicationDate),
        city: city as City,
        preview: preview,
        photos: photos.split(','),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseFloat(rating),
        type: type as HousingType,
        numberOfRooms: Number(numberOfRooms),
        numberOfGuests: Number(numberOfGuests),
        rentalCost: Number(rentalCost),
        facilities: facilities.split(',') as Facility[],
        authorId: author.id,
        numberOfComments: 0,
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }
      };

      await offerService.create(offerDto);

      console.log(chalk.magenta(`Импортировано предложение ${authorName} из города: ${offerDto.city}`));
    }

    await databaseClient.disconnect();
  }
}
