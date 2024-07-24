import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { BookingService } from '../../services';
import { CreateBookingDto } from '../../dtos/creates';
import { UpdateBookingDto } from '../../dtos/updates';

@Controller('rooms')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Body() customer_id: string,
    @Body() rooms_id: [room_id: string],
  ) {
    return this.bookingService.create(createBookingDto, customer_id, rooms_id);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  finById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Post(':id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
