import { City, HousingType, Facility, Coordinates } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsString, MaxLength, MinLength, ValidateNested, ArrayMinSize, ArrayMaxSize, IsArray, IsDateString, IsInt, Max, Min, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @IsString()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.createdDate.invalidFormat })
  public publicationDate!: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city!: City;

  @IsString({ message: CreateOfferValidationMessage.preview.invalidFormat })
  public preview!: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.minItems })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.maxItems })
  @IsString({ each: true, message: CreateOfferValidationMessage.photos.itemType })
  public photos!: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium!: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite!: boolean;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateOfferValidationMessage.rating.invalidFormat })
  public rating!: number;

  @IsEnum(HousingType, { message: CreateOfferValidationMessage.type.invalid })
  public type!: HousingType;

  @IsInt()
  @Min(1, { message: CreateOfferValidationMessage.numberOfRooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.numberOfRooms.maxValue })
  public numberOfRooms!: number;

  @IsInt()
  @Min(1, { message: CreateOfferValidationMessage.numberOfGuests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.numberOfGuests.maxValue })
  public numberOfGuests!: number;

  @IsInt({ message: CreateOfferValidationMessage.rentalCost.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.rentalCost.maxValue })
  public rentalCost!: number;

  @IsArray({ message: CreateOfferValidationMessage.facilities.invalidFormat })
  @IsEnum(Facility, { each: true, message: CreateOfferValidationMessage.facilities.invalidValue })
  public facilities!: Facility[];

  @IsMongoId({ message: CreateOfferValidationMessage.authorId.invalidId })
  public authorId!: string;

  public numberOfComments!: number;

  @ValidateNested()
  @Type(() => Object)
  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates!: Coordinates;
}
