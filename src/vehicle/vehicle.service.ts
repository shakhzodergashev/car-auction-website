import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { db } from '../prisma/db.js';
@Injectable()
export class VehicleService {
  async getVehicles() {
    const vehicles = await db.orm.public.Vehicle.include('model', (query) =>
      query.include('make'),
    ).all();
    return vehicles;
  }

  async getVehicleById(id: string) {
    const vehicleId = Number(id);

    const records = await db.orm.public.Vehicle.where({ id: vehicleId })
      .include('model', (query) => query.include('make'))
      .all();

    const vehicle = records[0];

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

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
