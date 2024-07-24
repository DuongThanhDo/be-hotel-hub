import { UpdateRoomDto } from '../../dtos/updates/update-room.dto';
import { CreateRoomDto } from './../../dtos/creates/create-room.dto';
import { RoomService } from './../../services/room.service';
import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  create(createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  finById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Post(':id')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }
}
