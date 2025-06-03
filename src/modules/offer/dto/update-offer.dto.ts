import { City, HousingType, Facility, Coordinates } from '../../../types/index.js';
import { IsOptional, IsBoolean, IsEnum, IsNumber, IsString, MaxLength, MinLength, ValidateNested, IsArray, IsDateString, IsInt, Max, Min, IsObject } from 'class-validator';
import { CreateUpdateOfferValidationMessage } from './update-offer.messages.js';
import { Type } from 'class-transformer';
import { CoordinatesValidator } from './coordinates.validator.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: CreateUpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, { message: CreateUpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferValidationMessage.createdDate.invalidFormat })
  public publicationDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferValidationMessage.preview.invalidFormat })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferValidationMessage.photos.invalidFormat })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType, { message: CreateUpdateOfferValidationMessage.type.invalid })
  public type?: HousingType;

  @IsOptional()
  @IsInt()
  @Min(1, { message: CreateUpdateOfferValidationMessage.numberOfRooms.minValue })
  @Max(8, { message: CreateUpdateOfferValidationMessage.numberOfRooms.maxValue })
  public numberOfRooms?: number;

  @IsOptional()
  @IsInt()
  @Min(1, { message: CreateUpdateOfferValidationMessage.numberOfGuests.minValue })
  @Max(10, { message: CreateUpdateOfferValidationMessage.numberOfGuests.maxValue })
  public numberOfGuests?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.rentalCost.invalidFormat })
  @Min(100, { message: CreateUpdateOfferValidationMessage.rentalCost.minValue })
  @Max(100000, { message: CreateUpdateOfferValidationMessage.rentalCost.maxValue })
  public rentalCost?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferValidationMessage.facilities.invalidFormat })
  public facilities?: Facility[];

  @IsOptional()
  public numberOfComments?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesValidator)
  @IsObject({ message: CreateUpdateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates?: Coordinates;
}
