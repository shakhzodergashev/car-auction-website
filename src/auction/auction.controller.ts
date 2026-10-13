import { Controller, Post, Body, Req, Patch, Param } from '@nestjs/common';
import { AuctionService } from './auction.service.js';
import { CreateAuctionDto } from './dto/create-auction.dto.js';
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
  createAuction(
    @Body() createAuctionDto: CreateAuctionDto,
    @Req() request: any,
  ) {
    return this.auctionService.createAuction(
      createAuctionDto,
      request.user.userId,
    );
  }

  @Patch(':id/go-live')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER')
  activateAuction(@Param('id') auctionId: string) {
    return this.auctionService.goLive(Number(auctionId));
  }
}
