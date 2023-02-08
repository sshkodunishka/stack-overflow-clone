import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>
    ){}

    async remove(id: number): Promise<string>{
        await this.answerRepository.delete(id)
        return 'Успешно'
    }
}
