import { Injectable } from '@nestjs/common';
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
    private userService: UsersService
  ) {}

  async remove(id: number): Promise<boolean> {
    await this.answerRepository.delete(id);
    return true;
  }

  async edit(id: number, dto: CreateAnswerDto): Promise<boolean> {
    await this.answerRepository.update({id}, {...dto});
    return true;
  }

  async add(dto: CreateAnswerDto): Promise<Answer>{
    const user = await this.userService.getUserById(dto.userId)
    const question = await this.questionService.findOne(dto.questionId)
    let res = await this.answerRepository.save({...dto, user, question})
    return res
  }
}
