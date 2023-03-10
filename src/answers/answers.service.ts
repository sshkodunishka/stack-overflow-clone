import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { User } from 'src/users/users.model';

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

  async add(dto: CreateAnswerDto, userId: number): Promise<Answer> {
    const question = await this.questionService.findOne(dto.questionId);
    const answer = await this.answerRepository.save({
      ...dto,
      question,
      user: { id: userId } as User,
    });
    return answer;
  }

  async voteAnswer(
    userId: number,
    id: number,
    rating: string,
  ): Promise<boolean> {
    const vote: number = JSON.parse(rating.toLowerCase()) ? 1 : -1;
    const event: Answer = await this.answerRepository.findOneBy({ id })
    let ratingObj: any;
    let index: number = 0
    event.ratingArr.map((e, i) => {
      if(e.userId == userId + ""){
        index += i
        ratingObj = e
      }
    })

    if (!ratingObj) {
      await this.answerRepository.query(
        `UPDATE answer SET Rating = Rating + ${vote}, "ratingArr" = "ratingArr" || '[{"userId":"${userId}","vote":"${vote}"}]'::jsonb  WHERE id = ${id}`,
      );
      return true;
    }

    if ((ratingObj.vote == "1" && vote == -1) || (ratingObj.vote == "-1" && vote == 1)) {
      await this.answerRepository.query(
        `UPDATE answer SET Rating = Rating + ${vote}, "ratingArr" = jsonb_set("ratingArr", '{${index}, vote}', '"0"', false)  WHERE id = ${id}`,
      );
      return true;
    }

    if (ratingObj.vote == "0") {
      await this.answerRepository.query(
        `UPDATE answer SET Rating = Rating + ${vote}, "ratingArr" = jsonb_set("ratingArr", '{${index}, vote}', '"${vote}"', false)  WHERE id = ${id}`,
      );
      return true;
    }

    return false;
  }
}
