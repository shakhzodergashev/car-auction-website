import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class AuctionService {
  async createAuction(createAuctionDto: CreateAuctionDto, managerId: number) {
    const vehicleId = createAuctionDto.vehicleId;
    const vehicles = await db.orm.public.Vehicle.where({ id: vehicleId }).all();
    const requestedVehicle = vehicles[0];
    if (!requestedVehicle) {
      throw new NotFoundException('There is no vehicle with such id');
    }
    const startTime = new Date(createAuctionDto.startTime);
    const endTime = new Date(createAuctionDto.endTime);
    if (startTime >= endTime) {
      throw new BadRequestException('End time must be after start time');
    }
    const startingPrice = createAuctionDto.startingPrice;
    if (startingPrice <= 0) {
      throw new BadRequestException('Starting price must be greater than 0');
    }
    const newAuction = await db.orm.public.Auction.create({
      startingPrice: startingPrice,
      startTime: startTime,
      endTime: endTime,
      vehicleId: vehicleId,
      managerId: managerId,
      status: 'DRAFT',
    });
    return newAuction;
  }
}
