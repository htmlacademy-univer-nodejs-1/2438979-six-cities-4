import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { Coordinates } from '../../../types/index.js';
import { Transform } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public createdDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  @Transform(({ obj }) => {
    const currentUserId = obj.currentUserId as string | undefined;
    return Array.isArray(obj.favoriteUserIds) && currentUserId
      ? obj.favoriteUserIds.includes(currentUserId)
      : false;
  })
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public numberOfRooms!: number;

  @Expose()
  public numberOfGuests!: number;

  @Expose()
  public rentalCost!: number;

  @Expose()
  public facilities!: string[];

  @Expose()
  public numberOfComments!: number;

  @Expose()
  public coordinates!: Coordinates;

  @Expose()
  @Type(() => UserRdo)
  public authorId!: UserRdo;
}
