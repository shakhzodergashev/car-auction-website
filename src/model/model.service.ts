import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class ModelService {
  async createModel(createModelDto: CreateModelDto) {
    const makeId = createModelDto.makeId;

    const records = await db.orm.public.Make.where({
      id: makeId,
    }).all();

    const requestedMake = records[0];

    if (!requestedMake) {
      throw new NotFoundException('There is no make with such id');
    }

    const newModel = await db.orm.public.Model.create({
      name: createModelDto.name,
      makeId: createModelDto.makeId,
    });

    return newModel;
  }
}
