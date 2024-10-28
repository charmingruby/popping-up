import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  username: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string
}
