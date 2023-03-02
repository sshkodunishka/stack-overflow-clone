import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tag } from './tags.model';
import { Question } from 'questions/questions.model';
import { User } from 'users/users.model';

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;
  let tagsRepository: Repository<Tag>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    tagsService = moduleRef.get<TagsService>(TagsService);
    tagsController = moduleRef.get<TagsController>(TagsController);
    tagsRepository = moduleRef.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  describe('findAll', () => {
    it('should return an array of Tags', async () => {
      const result = [
        {
          id: 1,
          title: 'test',
          description: 'test',
          questions: [],
        },
      ];
      jest.spyOn(tagsRepository, 'find').mockResolvedValueOnce(result);

      expect(await tagsController.getAll()).toBe(result);
    });
  });
  describe('create', () => {
    it('should create Tag', async () => {
      const body = {
        title: 'test',
        description: 'test',
      };
      const result = {
        id: 1,
        title: 'test',
        description: 'test',
        questions: [{} as Question],
      };
      jest.spyOn(tagsRepository, 'save').mockResolvedValueOnce(result);

      expect(await tagsController.create(body)).toBe(result);
    });
  });
  describe('getOne', () => {
    it('should return a Tag', async () => {
      const result = {
        id: 1,
        title: 'test',
        description: 'test',
        questions: [{} as Question],
      };
      jest.spyOn(tagsRepository, 'findOneBy').mockResolvedValueOnce(result);

      expect(await tagsController.getOne(result.id)).toBe(result);
    });
  });
  describe('getQuestions', () => {
    it('should return an array of Questions on the Tag', async () => {
      const result = [
        {
          id: 1,
          title: 'test',
          description: 'test',
          questions: [
            {
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
            },
          ],
        },
      ];
      jest.spyOn(tagsRepository, 'find').mockResolvedValueOnce(result);

      expect(await tagsController.getQuestions('test')).toBe(result);
    });
  });
  // describe('remove', () => {
  //   it('should delete a Tag', async () => {
  //     const result = {
  //       id: 1,
  //       title: 'test',
  //       description: 'test',
  //       questions: [{} as Question],
  //     };
  //     const tag = {} as Tag;
  //     jest.spyOn(tagsRepository, 'findOne').mockResolvedValueOnce(result);
  //     jest.spyOn(tagsRepository, 'delete').mockResolvedValueOnce(null);

  //     expect(await tagsController.remove(result.id)).toBeNull();
  //   });
  // });
});
