import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto.js';

@Injectable()
export class AuctionService {
  createAuction(createAuctionDto: CreateAuctionDto) {}
}
