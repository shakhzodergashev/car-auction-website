import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class AuctionService {
  createAuction(createAuctionDto: CreateAuctionDto, managerId: number) {}
}
