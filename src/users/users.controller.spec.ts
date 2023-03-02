import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

const user:any = {
  id: 1,
  login: 'test',
  password: 'test',
  firstName: 'test',
  lastName: 'test',
  questions: [],
  answers: [],
  role: { id: 1, roleName: 'test', users: [] }
}

describe("UsersController", () => {
  let userController: UsersController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockUser: User = {...user};

  const mockUsers: [User] = [mockUser]

  const mockUserService = {
    getAllUsers: jest
      .fn()
      .mockImplementation(() => {
        return [...mockUsers]
    })
  };

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(UsersService)
    .useValue(mockUserService)
    .compile();

    userController = moduleRef.get<UsersController>(UsersController);
  });


  it("should get all users", () => {
    expect(userController.getAll()).toEqual(mockUsers);
  });
});