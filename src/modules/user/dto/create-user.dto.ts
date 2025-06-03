import { IsEmail, IsIn, IsOptional, IsString, Length, Matches } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name!: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsOptional()
  @Matches(/\.(jpg|png)$/, {
    message: CreateUserMessages.avatar.invalidFormat,
  })
  public avatar?: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password!: string;

  @IsIn(['ordinary', 'pro'], { message: CreateUserMessages.type.invalid })
  public type!: string;
}
