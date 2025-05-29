import chalk from 'chalk';
import { Command } from './command.js';
import { Offer, City, HousingType, Facility } from '../../types/offer.js';
import { UserType } from '../../types/user.js';
import fs from 'node:fs';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import readline from 'node:readline';

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

      const offer: Offer = {
        title: title,
        description: description,
        publicationDate: new Date(publicationDate),
        city: City[city as keyof typeof City],
        preview: preview,
        photos: photos.split(','),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseFloat(rating),
        type: type as HousingType,
        numberOfRooms: Number(numberOfRooms),
        numberOfGuests: Number(numberOfGuests),
        rentalCost: Number(rentalCost),
        facilities: facilities.split(',').map((f) => Facility[f as keyof typeof Facility]),
        author: {
          name: authorName,
          email: authorEmail,
          avatar: authorAvatar,
          password: authorPassword,
          type: authorType as UserType
        },
        numberOfComments: 0,
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }
      };

      console.log(chalk.magenta(`Импортировано предложение ${offer.author.name} из города: ${offer.city}`));
    }
  }
}
