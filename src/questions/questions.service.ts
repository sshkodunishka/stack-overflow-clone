import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './questions.model';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>
    ){}

    async findAll(): Promise<Question[]>{
        const res = await this.questionRepository.find()
        return res
    }

    async findAllAnswers(id: number): Promise<Question[]>{
        return await this.questionRepository.find({relations: {answers: true}, where: {id}})
    }

    async remove(id: number): Promise<string>{
        await this.questionRepository.delete(id)
        return 'Успешно'
    }
}
