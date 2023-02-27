import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './questions.model';
import { Tag } from '../tags/tags.model';
import { TagsService } from '../tags/tags.service';
import { User } from '../users/users.model';

describe('QuestionsController', () => {
  let questionsController: QuestionsController;
  let questionsService: QuestionsService;
  let questionsRepository: Repository<Question>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useClass: Repository,
        },
        TagsService,
        { provide: getRepositoryToken(Tag), useClass: Repository },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    questionsService = moduleRef.get<QuestionsService>(QuestionsService);
    questionsController =
      moduleRef.get<QuestionsController>(QuestionsController);
    questionsRepository = moduleRef.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
  });

  describe('getAll', () => {
    it('should return an array of Questions', async () => {
      const result = [
        {
          id: 1,
          tag: { id: 1, title: 'test', description: 'test', questions: [] },
          answers: [],
          user: {
            id: 1,
            login: 'test',
            password: 'test',
            firstName: 'test',
            lastName: 'test',
            questions: [],
            answers: [],
            role: { id: 1, roleName: 'test', users: [] },
          },
          rating: 0,
          ratingArr: [],
          title: 'test',
          description: 'test',
          created: new Date(),
          update: new Date(),
        },
      ];
      jest.spyOn(questionsRepository, 'find').mockResolvedValueOnce(result);

      expect(await questionsController.getAll()).toBe(result);
    });
  });
  describe('getAnswers', () => {
    it('should return an array of Answers', async () => {
      const result = [
        {
          id: 1,
          tag: { id: 1, title: 'test', description: 'test', questions: [] },
          answers: [
            {
              id: 1,
              question: {} as Question,
              user: {} as User,
              rating: 0,
              ratingArr: [],
              description: 'test',
              created: new Date(),
              update: new Date(),
            },
          ],
          user: {
            id: 1,
            login: 'test',
            password: 'test',
            firstName: 'test',
            lastName: 'test',
            questions: [],
            answers: [],
            role: { id: 1, roleName: 'test', users: [] },
          },
          rating: 0,
          ratingArr: [],
          title: 'test',
          description: 'test',
          created: new Date(),
          update: new Date(),
        },
      ];
      jest.spyOn(questionsRepository, 'find').mockResolvedValueOnce(result);

      expect(await questionsController.getAll()).toBe(result);
    });
  });
  describe('add', () => {
    it('should add a Question', async () => {
      const body = {
        title: 'test',
        description: 'test',
        tagId: 1,
      };

      const result = {
        id: 1,
        tag: {} as Tag,
        answers: [],
        user: { id: 1 } as User,
        rating: 0,
        ratingArr: [],
        title: 'test',
        description: 'test',
        created: new Date(),
        update: new Date(),
      };
      const id = result.user.id;
      jest.spyOn(questionsRepository, 'save').mockResolvedValueOnce(result);

      expect(await questionsController.add(body, id)).toBe(result);
    });
  });
});
