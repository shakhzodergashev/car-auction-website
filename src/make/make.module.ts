import { Module } from '@nestjs/common';
import { MakeController } from './make.controller.js';
import { MakeService } from './make.service.js';

@Module({
  controllers: [MakeController],
  providers: [MakeService]
})
export class MakeModule {}
