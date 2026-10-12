import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { db } from '../prisma/db.js';
@Injectable()
export class VehicleService {
  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const modelId = createVehicleDto.modelId;
    const records = await db.orm.public.Model.where({ id: modelId }).all();

    const requestedModel = records[0];

    if (!requestedModel) {
      throw new NotFoundException('There is no such model');
    }

    const newVehicle = await db.orm.public.Vehicle.create({
      year: createVehicleDto.year,
      vin: createVehicleDto.vin,
      color: createVehicleDto.color,
      mileage: createVehicleDto.mileage,
      transmission: createVehicleDto.transmission,
      modelId: modelId,
    });
    return newVehicle;
  }
}
