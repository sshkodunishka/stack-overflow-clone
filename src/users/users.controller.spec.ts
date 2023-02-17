import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
describe('UserController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('createUser', () => {
    it('should create user', () => {
      expect(controller).toBeDefined();
    });
  });
});
