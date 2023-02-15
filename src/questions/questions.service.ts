import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    const questions = await this.questionRepository.find();
    return questions;
  }

  async findAllAnswers(id: number): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: { answers: true },
      where: { id },
    });
  }

  async remove(id: number): Promise<boolean> {
    await this.questionRepository.delete(id);
    return true;
  }

  async edit(id: number, dto: CreateQuestionDto): Promise<boolean> {
    await this.questionRepository.update(id, dto);
    return true;
  }

  async add(dto: CreateQuestionDto): Promise<Question>{
    const res = await this.questionRepository.save(dto);
    return res;
  }

  async sortBytags(): Promise<Question[]>{
    return await this.questionRepository.find({order: { tag: { 'id' : 'ASC'}}})
  }
}
