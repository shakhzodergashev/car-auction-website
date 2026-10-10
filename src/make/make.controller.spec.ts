import { Test, TestingModule } from '@nestjs/testing';
import { MakeController } from './make.controller.js';

describe('MakeController', () => {
  let controller: MakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakeController],
    }).compile();

    controller = module.get<MakeController>(MakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
