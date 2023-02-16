import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';
import { QuestionRating } from './questionsRating.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionRating)
    private ratingRepository: Repository<QuestionRating>,
    private tagService: TagsService
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

  async findOne(id: number): Promise<Question>{
    return await this.questionRepository.findOneBy({ id })
  }

  async remove(id: number): Promise<boolean> {
    await this.questionRepository.delete(id);
    return true;
  }

  async edit(id: number, dto: CreateQuestionDto): Promise<boolean> {
    await this.questionRepository.update({ id }, {...dto});
    return true;
  }

  async add(dto: CreateQuestionDto): Promise<Question>{
    const tag = await this.tagService.findOne(dto.tagId)
    const res = await this.questionRepository.save({...dto, tag});
    return res;
  }

  async sortBytags(): Promise<Question[]>{
    return await this.questionRepository.find({order: { tag: { 'id' : 'ASC'}}})
  }

  async voteQuestion(id: number, rating: string): Promise<boolean>{
    const user = 1
    const vote = JSON.parse(rating.toLowerCase()) ? 1 : -1
    const event = await this.ratingRepository.findOneBy({userId: user, questionId: id})
    if(!event){
      await this.ratingRepository.save({userId: user, questionId: id, rating: vote})
      return true
    }
    else if(event.rating == 1 && vote == -1){ 
      await this.ratingRepository.save({...event ,rating: 0})
      return true
    }
    else if(event.rating == -1 && vote == 1 ){
      await this.ratingRepository.save({...event, rating: 0})
      return true
    }
    else if(event.rating == 0){
      await this.ratingRepository.save({...event, rating: vote})
      return true
    }
    return false
  }
}
