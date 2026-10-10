import { Body, Controller, Post } from '@nestjs/common';
import { MakeService } from './make.service.js';
import { CreateMakeDto } from './dto/create-make.dto.js';

@Controller('make')
export class MakeController {
  constructor(private makeService: MakeService) {}

  @Post()
  createMake(@Body() createMakeDto: CreateMakeDto) {
    return this.makeService.createMake(createMakeDto);
  }
}
