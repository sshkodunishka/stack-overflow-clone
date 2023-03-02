import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Question } from 'questions/questions.model';
import { User } from 'users/users.model';
import { QuestionsController } from './questions.controller';
import { Answer } from 'answers/answers.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { Tag } from 'tags/tags.model';

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

describe("QuestionsController", () => {
  let questionController: QuestionsController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRequest = httpMocks.createRequest();
  mockRequest.user = {...user};

  const mockQuestion: Question = {
    id: 1,
    answers: [{} as Answer],
    tag: {} as Tag,
    user: {} as User,
    rating: 0,
    ratingArr: [],
    title: 'test',
    description: 'test',
    created: new Date(),
    update: new Date(),
  };

  const mockQuestions: [Question] = [mockQuestion]

  const mockQuestionService = {
    add: jest
      .fn()
      .mockImplementation((dto: CreateQuestionDto, userId: number) => {
        return {
          ...mockQuestion
        };
      }),
    edit: jest
      .fn()
      .mockImplementation((id: number, user: User,dto: CreateQuestionDto) => {
        return false || true;
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number, user: User) => {
        return false || true;
    }),
    voteQuestion: jest
      .fn()
      .mockImplementation((userId: number, id: number, rating: string) => {
        return false || true;
    }),
    sortBytags: jest
      .fn()
      .mockImplementation(() => {
        return [...mockQuestions]
    }),
    findAll: jest
      .fn()
      .mockImplementation(() => {
        return [...mockQuestions]
    }), 
    findAllAnswers: jest
      .fn()
      .mockImplementation((id: number) => {
        return {...mockQuestion}
    })
  };

  const mockQuestionDto = {
    title: 'test',
    description: 'test',
    tagId: 1
  }

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        QuestionsService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(QuestionsService)
    .useValue(mockQuestionService)
    .compile();

    questionController = moduleRef.get<QuestionsController>(QuestionsController);
  });

  it("should create a question", () => {
    expect(questionController.add(mockQuestionDto, mockRequest)).toEqual({
      id: expect.any(Number),
      ...mockQuestion,
    });
  });

  it("should update a question", () => {
    expect(questionController.edit(mockRequest, 1, mockQuestionDto)).toEqual(true);
  });

  it("should remove a question", () => {
    expect(questionController.remove(mockRequest, 1)).toEqual(true);
  });

  it("should vote a question", () => {
    expect(questionController.voteQuestion(1, 'true', mockRequest)).toEqual(true);
  });

  it("should sort questions by tag", () => {
    expect(questionController.sortBytags()).toEqual(mockQuestions);
  });

  it("should get all questions", () => {
    expect(questionController.getAll()).toEqual(mockQuestions);
  });

  it("should get all answers to question", () => {
    expect(questionController.getAnswers(1)).toEqual(mockQuestion);
  });
});