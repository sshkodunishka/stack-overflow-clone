import { Controller, Delete, Get, Param, Post, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';
import { QuestionRating } from './questionsRating.model';

@ApiTags('Вопросы')
@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @ApiOperation({ summary: 'Все вопросы' })
  @ApiResponse({ status: 200, type: [Question] })
  @Get()
  getAll() {
    return this.questionService.findAll();
  }

  @ApiOperation({ summary: 'Все ответы на вопрос' })
  @ApiResponse({ status: 200, type: [Question] })
  @Get('/:id/answers')
  getAnswers(@Param('id') id: number) {
    return this.questionService.findAllAnswers(id);
  }

  @ApiOperation({ summary: 'Удалить вопрос' })
  @ApiResponse({ status: 200, type: Question })
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }

  @Put('/:id')
  edit(@Param('id') id: number, @Body() dto: CreateQuestionDto) {
    return this.questionService.edit(id, dto);
  }

  @Post()
  add(@Body() dto: CreateQuestionDto){
    return this.questionService.add(dto)
  }

  @Get('/sort')
  sortBytags(){
    return this.questionService.sortBytags()
  }

  @Post('/:id/vote')
  voteQuestions(@Param('id') id: number, @Query('rating') rating: string){
    return this.questionService.voteQuestion(id, rating)
  }
}
