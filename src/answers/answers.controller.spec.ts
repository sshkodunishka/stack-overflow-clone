import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './answers.model';

describe('AnswersController', () => {
  let answersController: AnswersController;
  let answersService: AnswersService;
  let answersRepository: Repository<Answer>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    answersService = moduleRef.get<AnswersService>(AnswersService);
    answersController = moduleRef.get<AnswersController>(AnswersController);
    answersRepository = moduleRef.get<Repository<Answer>>(
      getRepositoryToken(Answer),
    );
  });
});
