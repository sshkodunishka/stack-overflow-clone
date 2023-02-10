import { Body, Controller, Delete, Param, Put} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@ApiTags('Ответы')
@Controller('answers')
export class AnswersController {
    constructor(private answerService: AnswersService){}

    @ApiOperation({summary: 'Удалить ответы'})
    @ApiResponse({status: 200, type: Answer})
    @Delete('/:id')
    remove(@Param('id') id: number){
        return this.answerService.remove(id)
    }

    @Put('/:id')
    edit(@Param('id') id: number, @Body() dto: CreateAnswerDto){
        return this.answerService.edit(id, dto)
    }
}
