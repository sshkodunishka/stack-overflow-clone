import { User } from '../users/users.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from '../tags/tags.service';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private tagService: TagsService,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      relations: {
        user: true,
      },
    });
    return questions;
  }

  async findAllAnswers(id: number): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: { answers: true, user: true },
      where: { id },
    });
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }

  async remove(id: number, user: any): Promise<boolean> {
    const userId = user.id;
    const questionId = await this.questionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
    if (userId !== questionId.user.id && user.roleName !== 'admin') {
      throw new UnauthorizedException({ message: 'user has no rights' });
    }
    await this.questionRepository.delete(id);
    return true;
  }

  async edit(id: number, user: any, dto: CreateQuestionDto): Promise<boolean> {
    const userId = user.id;
    const questionId = await this.questionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
    if (userId !== questionId.user.id && user.roleName !== 'admin') {
      throw new UnauthorizedException({ message: 'user has no rights' });
    }
    await this.questionRepository.update({ id }, { ...dto });
    return true;
  }

  async add(dto: CreateQuestionDto, userId: number): Promise<Question> {
    const tag = await this.tagService.findOne(dto.tagId);
    const question = await this.questionRepository.create({
      ...dto,
      tag,
      user: { id: userId } as User,
    });
    await this.questionRepository.save(question);
    return question;
  }

  async sortBytags(): Promise<Question[]> {
    return await this.questionRepository.find({
      order: { tag: { id: 'ASC' } },
    });
  }

  async voteQuestion(
    userId: number,
    id: number,
    rating: string,
  ): Promise<boolean> {
    const vote: number = JSON.parse(rating.toLowerCase()) ? 1 : -1;
    const event: Question = await this.questionRepository.findOneBy({ id });
    let ratingObj: any;
    let index = 0;
    event.ratingArr.map((e, i) => {
      if (e.userId == userId + '') {
        index += i;
        ratingObj = e;
      }
    });

    if (!ratingObj) {
      await this.questionRepository.query(
        `UPDATE question SET Rating = Rating + ${vote}, "ratingArr" = "ratingArr" || '[{"userId":"${userId}","vote":"${vote}"}]'::jsonb  WHERE id = ${id}`,
      );
      return true;
    }

    if (
      (ratingObj.vote == '1' && vote == -1) ||
      (ratingObj.vote == '-1' && vote == 1)
    ) {
      await this.questionRepository.query(
        `UPDATE question SET Rating = Rating + ${vote}, "ratingArr" = jsonb_set("ratingArr", '{${index}, vote}', '"0"', false)  WHERE id = ${id}`,
      );
      return true;
    }

    if (ratingObj.vote == '0') {
      await this.questionRepository.query(
        `UPDATE question SET Rating = Rating + ${vote}, "ratingArr" = jsonb_set("ratingArr", '{${index}, vote}', '"${vote}"', false)  WHERE id = ${id}`,
      );
      return true;
    }

    return false;
  }
}
