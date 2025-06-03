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
  public previewImage!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  @Transform(({ obj }) => {
    const currentUserId = obj.currentUserId as string | undefined;
    return Array.isArray(obj.favouriteUserIds) && currentUserId
      ? obj.favouriteUserIds.includes(currentUserId)
      : false;
  })
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public amenities!: string[];

  @Expose()
  public commentCount!: number;

  @Expose()
  public coordinates!: Coordinates;

  @Expose()
  @Type(() => UserRdo)
  public userId!: UserRdo;
}
