import { Body, Controller, Post } from '@nestjs/common';
import { ModelService } from './model.service.js';
import { CreateModelDto } from './dto/create-model.dto.js';

@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {}

  @Post()
  createModel(@Body() createModelDto: CreateModelDto) {
    return this.modelService.createModel(createModelDto);
  }
}
