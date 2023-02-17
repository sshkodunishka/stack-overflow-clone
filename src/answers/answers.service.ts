import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Answer } from './answers.model';
import { AnswerRating } from './answersRating.model';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(AnswerRating)
    private answeRatingRepository: Repository<AnswerRating>,
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

  async voteAnswer(id: number, rating: string): Promise<boolean>{
    const user = 1
    const vote = JSON.parse(rating.toLowerCase()) ? 1 : -1
    const event = await this.answeRatingRepository.findOneBy({userId: user, answerId: id})
    if(!event){
      await this.answeRatingRepository.save({userId: user, answerId: id, rating: vote})
      return true
    }
    
    if(event.rating == 1 && vote == -1){ 
      await this.answeRatingRepository.save({...event ,rating: 0})
      return true
    }
    
    if(event.rating == -1 && vote == 1 ){
      await this.answeRatingRepository.save({...event, rating: 0})
      return true
    }
    
    if(event.rating == 0){
      await this.answeRatingRepository.save({...event, rating: vote})
      return true
    }
    return false
  }
}
