import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  theme: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(8)
  description: string
}
