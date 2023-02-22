import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private questionService: QuestionsService,
    private userService: UsersService,
  ) {}

  async remove(id: number, user: any): Promise<boolean> {
    const userId = user.id;
    const answerId = await this.answerRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
    if (userId !== answerId.user.id && user.roleName !== 'admin') {
      throw new UnauthorizedException({ message: 'user has no rights' });
    }
    await this.answerRepository.delete(id);
    return true;
  }

  async edit(id: number, user: any, dto: CreateAnswerDto): Promise<boolean> {
    const userId = user.id;
    const answerId = await this.answerRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
    if (userId !== answerId.user.id && user.roleName !== 'admin') {
      throw new UnauthorizedException({ message: 'user has no rights' });
    }
    await this.answerRepository.update(id, { ...dto });
    return true;
  }

  async add(dto: CreateAnswerDto): Promise<Answer> {
    const user = await this.userService.getUserById(dto.userId);
    const question = await this.questionService.findOne(dto.questionId);
    const res = await this.answerRepository.save({ ...dto, user, question });
    return res;
  }

  async voteAnswer(userId: number, id: number, rating: string): Promise<boolean> {
    const user = 1;
    const vote = JSON.parse(rating.toLowerCase()) ? 1 : -1;

    const event = await this.answerRepository.query(`SELECT * FROM answer WHERE id = ${id} AND "ratingArr"::json->>'userId'='${userId}'`);
    
    if (!event.length) {
      await this.answerRepository.query(`UPDATE answer SET "ratingArr" = "ratingArr" || '[{"userId":"${userId}","vote":"${vote}"}]'::jsonb  WHERE id = ${id}`);
      return true;
    }
    /*
    if (event.rating == 1 && vote == -1) {
      await this.answeRatingRepository.save({ ...event, rating: 0 });
      return true;
    }

    if (event.rating == -1 && vote == 1) {
      await this.answeRatingRepository.save({ ...event, rating: 0 });
      return true;
    }

    if (event.rating == 0) {
      await this.answeRatingRepository.save({ ...event, rating: vote });
      return true;
    }
    return false;
  }
  */
  }
}
