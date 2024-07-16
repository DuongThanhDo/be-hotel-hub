import { CreateRentalSlipDto } from './../../dtos/rentalSlip_dtos/create-rentalSlip.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { RentalSlipService } from '../../services';

@Controller('rental-slip')
export class rentalSlipController {
  constructor(private readonly rentalSlipService: RentalSlipService) {}

  @Post()
  create(@Body() createRentalSlipDto: CreateRentalSlipDto) {
    return this.rentalSlipService.create(createRentalSlipDto);
  }
}
