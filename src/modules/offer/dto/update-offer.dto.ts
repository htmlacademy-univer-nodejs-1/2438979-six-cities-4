import { UUID } from 'node:crypto';
import { City, HousingType, Facility, Coordinates } from '../../../types/index.js';

export class PutOfferDto {
  public id!: UUID;
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: HousingType;
  public numberOfRooms!: number;
  public numberOfGuests!: number;
  public retalCost!: number;
  public facilities!: Facility[];
  public numberOfComments!: number;
  public coordinates!: Coordinates;
}
