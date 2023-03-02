import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { User } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshTokenDto } from 'src/users/dto/refresh-token.dto';
import { TokensDto } from 'src/users/dto/tokens.dto';
import { AuthService } from './auth.service';

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

const httpMocks = require("node-mocks-http");

describe("AuthController", () => {
  let authController: AuthController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = {...user};

  const mockLoginDto: LoginUserDto = {
    login: 'Shkodunishka',
    password: '1'
  }

  const mocktRegisterDto: CreateUserDto = {
    id: 1,
    login: 'Shkodunishka',
    password: '11111',
    firstName: 'Kristina',
    lastName: 'Shkoda'
  }

  const mockRefreshTokenDto: RefreshTokenDto = {
    refreshToken: 'dfc88a8e-d687-4691-b97e-e434437150cb'
  }

  const mockTokensDto: TokensDto = {
    refreshToken: 'dfc88a8e-d687-4691-b97e-e434437150cb',
    acsessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImlpIiwiaWQiOjUsImlhdCI6MTY3NjAxNzIwMCwiZXhwIjoxNjc2MTAzNjAwfQ.jh8HlLSJPg3o21E7Jv6jxTlX2v9kNjE-_GAwV1hF3V4'
  }

  const mockQuestionService = {
    login: jest
      .fn()
      .mockImplementation((userDto: LoginUserDto) => {
        return mockTokensDto;
      }),
    registration: jest
      .fn()
      .mockImplementation((userDto: CreateUserDto) => {
        return mockTokensDto;
    }),
    getRefreshedTokens: jest
      .fn()
      .mockImplementation((refreshTokenDto: RefreshTokenDto) => {
        return mockTokensDto;
    }),
    deleteRefreshToken: jest
      .fn()
      .mockImplementation((user: User) => {
        return;
    })
  };

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(AuthService)
    .useValue(mockQuestionService)
    .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it("should login user", () => {
    expect(authController.login(mockLoginDto)).toEqual(mockTokensDto)
  });

  it("should registration user", () => {
    expect(authController.registration(mocktRegisterDto)).toEqual(mockTokensDto);
  });

  it("should logout user", () => {
    expect(authController.logout(mockRequest)).toEqual(undefined);
  });

  it("should get refreshed token", () => {
    expect(authController.getRefreshedTokens(mockRefreshTokenDto)).toEqual(mockTokensDto);
  });
});