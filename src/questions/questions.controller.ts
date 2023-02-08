import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';

@ApiTags('Вопросы')
@Controller('questions')
export class QuestionsController {
    constructor(private questionService: QuestionsService){}


    @ApiOperation({summary: 'Все вопросы'})
    @ApiResponse({status: 200, type: [Question]})
    @Get()
    getAll(){
        return this.questionService.findAll()
    }

    @ApiOperation({summary: 'Все ответы на вопрос'})
    @ApiResponse({status: 200, type: [Question]})
    @Get('/answers/:id')
    getAnswers(@Param('id') id: number){
        return this.questionService.findAllAnswers(id)
    }


    @ApiOperation({summary: 'Удалить вопрос'})
    @ApiResponse({status: 200, type: Question})
    @Delete('/:id')
    remove(@Param('id') id: number){
        return this.questionService.remove(id)
    }
}
