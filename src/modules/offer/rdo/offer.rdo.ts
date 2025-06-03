import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { Coordinates } from '../../../types/index.js';

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
