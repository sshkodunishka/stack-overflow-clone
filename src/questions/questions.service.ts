import { User } from 'src/users/users.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private tagService: TagsService,
    // private usersService: UsersService,
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
    // const userId = await this.usersService.getUserById(dto.)
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
    const vote = JSON.parse(rating.toLowerCase()) ? 1 : -1;
    const event = await this.questionRepository.query(`SELECT * FROM question WHERE id = ${id} AND "ratingArr"::json->>'userId'='${userId}'`);
    
    if (!event.length) {
      await this.questionRepository.query(`UPDATE question SET "ratingArr" = "ratingArr" || '[{"userId":"${userId}","vote":"${vote}"}]'::jsonb  WHERE id = ${id}`);
      return true;
    }

    /*
    if (event.rating == 1 && vote == -1) {
      await this.questionRepository.save({ ...event, rating: 0 });
      return true;
    }

    if (event.rating == -1 && vote == 1) {
      await this.questionRepository.save({ ...event, rating: 0 });
      return true;
    }

    if (event.rating == 0) {
      await this.questionRepository.save({ ...event, rating: vote });
      return true;
    }
    */
    return false;
  }

}
