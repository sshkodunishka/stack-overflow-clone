import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './answers.model';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Question } from 'questions/questions.model';
import { User } from 'users/users.model';

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

describe("AnswersController", () => {
  let answerController: AnswersController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = {...user};

  const mockAnswer: Answer = {
    id: 1,
    question: {} as Question,
    user: {} as User,
    rating: 0,
    ratingArr: [],
    description: 'test',
    created: new Date(),
    update: new Date(),
  };

  const mockAnswerService = {
    add: jest
      .fn()
      .mockImplementation((dto: CreateAnswerDto, userId: number) => {
        return {
          ...mockAnswer
        };
      }),
    edit: jest
      .fn()
      .mockImplementation((id: number, user: User,dto: CreateAnswerDto) => {
        return false || true;
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number, user: User) => {
        return false || true;
    }),
    voteAnswer: jest
      .fn()
      .mockImplementation((userId: number, id: number, rating: string) => {
        return false || true;
    })
  };

  const mockAnswerDto = {
    description: 'test',
    questionId: 1
  }

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        AnswersService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(AnswersService)
    .useValue(mockAnswerService)
    .compile();

    answerController = moduleRef.get<AnswersController>(AnswersController);
  });

  it("should create a answer", () => {
    expect(answerController.add(mockAnswerDto, mockRequest)).toEqual({
      id: expect.any(Number),
      ...mockAnswer,
    });
  });

  it("should update a answer", () => {
    expect(answerController.edit(mockRequest, 1, mockAnswerDto)).toEqual(true);
  });

  it("should remove a answer", () => {
    expect(answerController.remove(mockRequest, 1)).toEqual(true);
  });

  it("should vote a answer", () => {
    expect(answerController.voteAnswer(1, 'true',mockRequest)).toEqual(true);
  });
});