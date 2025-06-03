import { IsNumber } from 'class-validator';

export class CoordinatesValidator {
  @IsNumber({}, { message: 'Latitude must be a number' })
  public latitude!: number;

  @IsNumber({}, { message: 'Longitude must be a number' })
  public longitude!: number;
}
