import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuctionModule } from './auction/auction.module.js';
import { MakeModule } from './make/make.module.js';
import { ModelModule } from './model/model.module.js';

@Module({
  imports: [UsersModule, AuthModule, AuctionModule, MakeModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
