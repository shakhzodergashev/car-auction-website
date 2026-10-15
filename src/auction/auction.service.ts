import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto.js';
import { db } from '../prisma/db.js';
import { Temporal } from 'temporal-polyfill';

@Injectable()
export class AuctionService {
  async createAuction(createAuctionDto: CreateAuctionDto, managerId: number) {
    const vehicleId = createAuctionDto.vehicleId;
    const vehicles = await db.orm.public.Vehicle.where({ id: vehicleId }).all();
    const requestedVehicle = vehicles[0];
    if (!requestedVehicle) {
      throw new NotFoundException('There is no vehicle with such id');
    }
    const startTime = Temporal.Instant.from(createAuctionDto.startTime);
    const endTime = Temporal.Instant.from(createAuctionDto.endTime);
    if (Temporal.Instant.compare(startTime, endTime) >= 0) {
      throw new BadRequestException('End time must be after start time');
    }
    const startingPrice = createAuctionDto.startingPrice;
    if (startingPrice <= 0) {
      throw new BadRequestException('Starting price must be greater than 0');
    }

    const records = await db.orm.public.Auction.where({
      vehicleId: vehicleId,
      status: 'LIVE',
    }).all();

    if (records.length > 0) {
      throw new BadRequestException('This vehicle already has a live auction');
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

  async goLive(auctionId: number) {
    const records = await db.orm.public.Auction.where({ id: auctionId }).all();
    const requestedAuction = records[0];
    if (!requestedAuction) {
      throw new NotFoundException('There is no auction with such id');
    }
    if (requestedAuction.status !== 'DRAFT') {
      throw new BadRequestException('Only draft auctions can be activated');
    }
    const liveAuctions = await db.orm.public.Auction.where({
      vehicleId: requestedAuction.vehicleId,
      status: 'LIVE',
    }).all();
    if (liveAuctions.length > 0) {
      throw new BadRequestException('This vehicle already has a live auction');
    }
    if (
      Temporal.Instant.compare(
        requestedAuction.startTime,
        requestedAuction.endTime,
      ) >= 0
    ) {
      throw new BadRequestException('End time must be after start time');
    }
    const updatedAuction = await db.orm.public.Auction.where({
      id: auctionId,
    }).update({ status: 'LIVE' });
    return updatedAuction;
  }

  async getAuctions(role: string) {
    if (role === 'BUYER') {
      const auctions = await db.orm.public.Auction.where({ status: 'LIVE' })
        .include('vehicle', (query) =>
          query.include('model', (query) => query.include('make')),
        )
        .all();
      return auctions;
    }
    const auctions = await db.orm.public.Auction.include('vehicle', (query) =>
      query.include('model', (query) => query.include('make')),
    ).all();
    return auctions;
  }

  async getAuctionsById(id: string, role: string) {
    const auctionId = Number(id);

    const records = await db.orm.public.Auction.where({ id: auctionId })
      .include('vehicle', (query) =>
        query.include('model', (query) => query.include('make')),
      )
      .all();

    const auction = records[0];

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    if (role === 'BUYER' && auction.status !== 'LIVE') {
      throw new NotFoundException('Auction not found');
    }
    return auction;
  }
}
