import { City, HousingType, Facility, Coordinates } from '../../../types/index.js';

export class CreateOfferDto {
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
  public rentalCost!: number;
  public facilities!: Facility[];
  public authorId!: string;
  public numberOfComments!: number;
  public coordinates!: Coordinates;
}
