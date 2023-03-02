import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { Question } from 'questions/questions.model';
import { Tag } from 'tags/tags.model';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

describe("TagsController", () => {
  let tagController: TagsController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockTag: Tag = {
    id: 1,
    questions: [{} as Question],
    title: 'test',
    description: 'test'
  };

  const mockTags: [Tag] = [mockTag]

  const mockTagService = {
    createTag: jest
      .fn()
      .mockImplementation((tagDto: CreateTagDto) => {
        return {...mockTag};
    }),
    editTag: jest
      .fn()
      .mockImplementation((id: number, tagDto: CreateTagDto) => {
        return false || true;
    }),
    remove: jest
      .fn()
      .mockImplementation((id: number) => {
        return false || true;
    }),
    findOne: jest
      .fn()
      .mockImplementation((id: number) => {
        return {...mockTag}
    }),
    findAll: jest
      .fn()
      .mockImplementation(() => {
        return [...mockTags]
    }), 
    findAllQuestion: jest
      .fn()
      .mockImplementation((title: string) => {
        return {...mockTag}
    })
  };

  const mockTagDto = {
    title: 'test',
    description: 'test'
  }

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        TagsService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(TagsService)
    .useValue(mockTagService)
    .compile();

    tagController = moduleRef.get<TagsController>(TagsController);
  });

  it("should create a tag", () => {
    expect(tagController.create(mockTagDto)).toEqual({
      id: expect.any(Number),
      ...mockTag,
    });
  });

  it("should update a tag", () => {
    expect(tagController.edit(1, mockTagDto)).toEqual(true);
  });

  it("should remove a tag", () => {
    expect(tagController.remove(1)).toEqual(true);
  });

  it("should get one tag", () => {
    expect(tagController.getOne(1)).toEqual(mockTag);
  });

  it("should get all tags", () => {
    expect(tagController.getAll()).toEqual(mockTags);
  });

  it("should get all questions to tag", () => {
    expect(tagController.getQuestions('test')).toEqual(mockTag);
  });
});