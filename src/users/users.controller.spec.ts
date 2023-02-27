import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    usersRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      const result = [
        {
          id: 1,
          login: 'test',
          password: 'test',
          firstName: 'test',
          lastName: 'test',
          questions: [],
          answers: [],
          role: { id: 1, roleName: 'test', users: [] },
        },
      ];
      jest.spyOn(usersRepository, 'find').mockResolvedValueOnce(result);

      expect(await usersController.getAll()).toBe(result);
    });
  });
});
