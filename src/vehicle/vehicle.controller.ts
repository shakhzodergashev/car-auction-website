import { Body, Controller, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service.js';
import { CreateVehicleDto } from './dto/create-vehicle.dto.js';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post()
  createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.createVehicle(createVehicleDto);
  }
}
