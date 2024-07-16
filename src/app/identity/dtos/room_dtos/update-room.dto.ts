import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  room_number?: string;

  @IsBoolean()
  status?: boolean;

  @IsString()
  type?: string;

  @IsNumber()
  price?: number;

  @IsString()
  description?: string;
}
