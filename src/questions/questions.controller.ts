import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
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
    @Get('/:id/answers')
    getAnswers(@Param('id') id: number){
        return this.questionService.findAllAnswers(id)
    }


    @ApiOperation({summary: 'Удалить вопрос'})
    @ApiResponse({status: 200, type: Question})
    @Delete('/:id')
    remove(@Param('id') id: number){
        return this.questionService.remove(id)
    }

    @Put('/:id')
    edit(@Param('id') id: number, dto: CreateQuestionDto){
        return this.questionService.edit(id, dto)
    }
}