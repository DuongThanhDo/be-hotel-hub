import { CreateRentalSlipDto } from './../../dtos/rentalSlip_dtos/create-rentalSlip.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RentalSlipService } from '../../services';
import { UpdateRentalSlipDto } from '../../dtos/rentalSlip_dtos';

@Controller('rental-slip')
export class rentalSlipController {
  constructor(private readonly rentalSlipService: RentalSlipService) {}

  @Post()
  create(@Body() createRentalSlipDto: CreateRentalSlipDto) {
    return this.rentalSlipService.create(createRentalSlipDto);
  }

  @Get()
  findAll() {
    return this.rentalSlipService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.rentalSlipService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRentalSlipDto: UpdateRentalSlipDto,
  ) {
    return this.rentalSlipService.update(id, updateRentalSlipDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rentalSlipService.delete(id);
  }
}
