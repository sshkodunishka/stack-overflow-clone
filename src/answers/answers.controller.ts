import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';

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
}
