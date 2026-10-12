import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service.js';
import { VehicleController } from './vehicle.controller.js';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
