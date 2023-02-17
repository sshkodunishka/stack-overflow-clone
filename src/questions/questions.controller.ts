import { Controller, Delete, Get, Param, Post, Put, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';

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

  @UseGuards(JwtAuthGuard)
  @Post('/:id/vote')
  voteQuestions(@Param('id') id: number, @Query('rating') rating: string, @Req() user: any){
    return this.questionService.voteQuestion(user.user.id, id, rating)
  }
}
