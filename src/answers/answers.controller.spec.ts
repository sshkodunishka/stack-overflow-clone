import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { Answer } from './answers.model';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../questions/questions.model';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/tags.model';
import { User } from 'src/users/users.model';

const req: any = {user : {
  id: 1,
  login: 'sdfsdf',
  password: '1111',
  firstName: 'dsfsdf',
  lastName: 'dfsf' 
}}

describe('AnswersController', () => {
  let answersController: AnswersController;
  let answersService: AnswersService;
  let answersRepository: Repository<Answer>;
  let questionsRepository: Repository<Question>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        AnswersService,
        QuestionsService,
        TagsService,
        {
          provide: getRepositoryToken(Answer),
          useClass: Repository,
          useValue: {
            add: jest
              .fn()
              .mockImplementation((dto: CreateAnswerDto) =>
                Promise.resolve({ id: 1, ...dto }),
              ),
            update: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
          }
        },
        {
          provide: getRepositoryToken(Question),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository
        }
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
    questionsRepository = moduleRef.get<Repository<Question>>(
      getRepositoryToken(Question)
    );
  });




  describe('add', () => {
    it('should create a new object', async () => {
      const newAnswerDTO: CreateAnswerDto = {
        description: 'New Description',
        questionId: 1,
      };

      const question: Question = {
        id: 1,
        tag: {} as Tag,
        answers: [],
        user: {} as User,
        rating: 0,
        ratingArr: [],
        title: 'test',
        description: 'test',
        created: new Date(),
        update: new Date(),
      }

      const result: Answer = {
        id: 1,
        question: {} as Question,
        user: {} as User,
        rating: 0,
        ratingArr: [],
        description: newAnswerDTO.description,
        created: new Date(),
        update: new Date(),
      }
      jest.spyOn(questionsRepository, 'findOne').mockResolvedValueOnce(question);
      jest.spyOn(answersRepository, 'save').mockResolvedValueOnce(result);
      expect(await answersController.add(newAnswerDTO, req)).toBe(result);
    });
  });



  describe('edit', () => {
    it('should update a new object', async () => {
      const id: number = 1

      const newAnswerDTO: CreateAnswerDto = {
        description: 'New Description',
        questionId: 1,
      };

      const result = {
        id: 1,
        question: {} as Question,
        user: { id: req.user.id } as User,
        rating: 0,
        ratingArr: [],
        description: newAnswerDTO.description,
        created: new Date(),
        update: new Date(),
      }
      jest.spyOn(answersRepository, 'findOne').mockResolvedValueOnce(result);
      expect(jest.spyOn(answersRepository, 'update')).toBeCalledWith('update elem');
      expect(await answersController.edit(req, id, newAnswerDTO)).toBe(true);
    });
  });



  describe('remove', () => {
    it('should return that it deleted a object', async () => {
      jest
        .spyOn(answersService, 'remove')
        .mockResolvedValueOnce(true);
      expect(await answersController.remove(req, 1)).toBe(true);
    });
    it('should return that it did not delete a object', async () => {
      jest
        .spyOn(answersService, 'remove')
        .mockResolvedValueOnce(false);
      expect(
        await answersController.remove(req, 5),
      ).toBe(false);
    });
  });




  describe('vote', () => {
    it('should return that it vote a answer', async () => {

      const result: Answer = {
        id: 1,
        question: {} as Question,
        user: {} as User,
        rating: 0,
        ratingArr: [],
        description: 'test',
        created: new Date(),
        update: new Date(),
      }

      jest.spyOn(answersRepository, 'findOneBy').mockResolvedValueOnce(result);
      expect(await answersController.voteAnswer(1, 'true', req)).toBe(true);
    });
  });
});
