import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from 'questions/questions.model';
import { User } from 'users/users.model';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { CanActivate } from '@nestjs/common';
import { Tag } from 'tags/tags.model';

describe('AnswerService', () => {
  let service: AnswersService;
  let repo: Repository<Answer>;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const user:any = {
    id: 1,
    login: 'test',
    password: 'test',
    firstName: 'test',
    lastName: 'test',
    questions: [],
    answers: [{ id: 1 } as Answer ],
    role: { id: 1, roleName: 'admin', users: [] }
  }

  const mockQuestion: Question = {
    id: 1,
    answers: [{ id: 1 } as Answer],
    tag: {} as Tag,
    user: { id: 1 } as User,
    rating: 0,
    ratingArr: [],
    title: 'test',
    description: 'test',
    created: new Date(),
    update: new Date(),
  }

  const mockAnswer: Answer = {
    id: 1,
    question: { id: 1 } as Question,
    user: { id: 1 } as User,
    rating: 0,
    ratingArr: [],
    description: 'test',
    created: new Date(),
    update: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(mockAnswer),
            findOne: jest.fn().mockResolvedValue(mockAnswer),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        }
      ],
    }).overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard).compile();

    service = module.get<AnswersService>(AnswersService);
    repo = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

/*
  describe('voteAnswer', () => {
    it('should get one cat', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.getOneByName(testCat1)).resolves.toEqual(oneCat);
      expect(repoSpy).toBeCalledWith({ where: { name: testCat1 } });
    });
  });
*//*
  describe('add', () => {
    it('should successfully insert a answer', () => {
      const newObj: CreateAnswerDto = {
        description: 'test1',
        questionId: 1
      }
      expect(
        service.add(newObj, 1),
      ).resolves.toEqual(mockAnswer);
      expect(repo.save).toBeCalledWith(mockAnswer);
    });
  });
*/
  describe('edit', () => {
    it('should call the update method', async () => {
      const newObj: CreateAnswerDto = {
        description: 'test1',
        questionId: 1
      }
      const obj = await service.edit(1, user, newObj);
      expect(obj).toEqual(true);
      expect(repo.findOne).toBeCalledTimes(1);
      expect(repo.findOne).toBeCalledWith({"relations": {"user": true}, "where": {"id": 1}});
      expect(repo.update).toBeCalledWith(1,
        {
          question: { id: newObj.questionId } as Question,
          user: { id: user.id } as User,
          rating: 0,
          ratingArr: [],
          description: newObj.description,
          created: new Date(),
          update: new Date()
        },
      );
    });
  });
/*
  describe('remove', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteOne('a uuid')).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteOne('a bad uuid')).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith({ id: 'a bad uuid' });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
  */
});
