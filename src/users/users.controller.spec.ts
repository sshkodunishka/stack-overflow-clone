import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
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
      jest
        .spyOn(usersService, 'getAllUsers')
        .mockImplementation(async () => result);

      expect(await usersController.getAll()).toBe(result);
    });
  });
});
