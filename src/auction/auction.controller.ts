import { Controller, Post, Body } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
import { Roles } from '../auth/decorators/roles/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles/roles.guard.js';

@Controller('auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER')
  @Post()
  createAuction(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.createAuction(createAuctionDto);
  }
}
