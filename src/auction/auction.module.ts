import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller.js';
import { AuctionService } from './auction.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AuctionController],
  providers: [AuctionService]
})
export class AuctionModule {}
