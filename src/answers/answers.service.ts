import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async remove(id: number): Promise<boolean> {
    await this.answerRepository.delete(id);
    return true;
  }

  async edit(id: number, dto: CreateAnswerDto): Promise<boolean> {
    await this.answerRepository.update(id, dto);
    return true;
  }
}
