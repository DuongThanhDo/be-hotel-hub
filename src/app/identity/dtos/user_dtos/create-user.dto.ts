import { IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  passwordHash: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  state: string;

  @IsDate()
  dateOfBirth: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  role: string;
}
