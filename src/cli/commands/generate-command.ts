import chalk from 'chalk';
import { createWriteStream } from 'node:fs';
import { Command } from './command.js';
import { Offer } from '../../types/offer.js';
import { JsonServerClient } from '../../lib/json-server-client/index.js';
import * as RandomUtils from '../../lib/utils/random/index.js';
import * as EntityConstants from '../../lib/constants/offer-constants.js';
import { getTsvFromOffer } from '../../lib/utils/tsv/index.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [stringNumber, filepath, url] = parameters;
    const numberToGenerate = Number(stringNumber);

    if (!numberToGenerate || !filepath || !url) {
      console.log(chalk.red('Проверьте передаваемые параметры. Использование: --generate <n> <путь к .tsv> <url>'));
      return;
    }

    const jsonServerClient = new JsonServerClient(url);
    const users = await jsonServerClient.fetchUsers();
    const offers = await jsonServerClient.fetchOffers();

    const fileWriteStream = createWriteStream(filepath, { flags: 'w', encoding: 'utf-8' });

    Array.from({ length: numberToGenerate }).forEach(() => {
      const randomUser = RandomUtils.getRandomItem(users);
      const randomOffer = RandomUtils.getRandomItem(offers);

      const generatedOffer: Offer = {
        title: randomOffer.title,
        description: randomOffer.description,
        publicationDate: randomOffer.publicationDate,
        city: randomOffer.city,
        preview: randomOffer.preview,
        photos: [...randomOffer.photos],
        isPremium: RandomUtils.getRandomBoolean(),
        isFavorite: RandomUtils.getRandomBoolean(),
        rating: RandomUtils.getRandomFloatNumberBetween(EntityConstants.MIN_RATING, EntityConstants.MAX_RATING),
        type: randomOffer.type,
        numberOfRooms: RandomUtils.getRandomNumberBetween(EntityConstants.MIN_ROOMS, EntityConstants.MAX_ROOMS),
        numberOfGuests: RandomUtils.getRandomNumberBetween(EntityConstants.MIN_GUESTS, EntityConstants.MAX_GUESTS),
        rentalCost: RandomUtils.getRandomNumberBetween(EntityConstants.MIN_RENT_COST, EntityConstants.MAX_RENT_COST),
        facilities: RandomUtils.getRandomSubarray(randomOffer.facilities),
        author: {
          name: randomUser.name,
          email: randomUser.email,
          avatar: randomUser.avatar ?? '',
          password: randomUser.password,
          type: randomUser.type
        },
        numberOfComments: 0,
        coordinates: {
          latitude: randomOffer.coordinates.latitude,
          longitude: randomOffer.coordinates.longitude
        }
      };

      fileWriteStream.write(`${getTsvFromOffer(generatedOffer)}\n`);
    });

    fileWriteStream.end();
    console.log(`Сгенерировано ${numberToGenerate} предложений`);
  }
}
