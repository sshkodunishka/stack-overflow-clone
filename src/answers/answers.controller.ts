import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { RolesGuard } from 'src/roles/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('Ответы')
@Controller('answers')
export class AnswersController {
  constructor(private answerService: AnswersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить ответы' })
  @ApiResponse({ status: 200, type: Answer })
  @Delete('/:id')
  remove(@Req() req: any, @Param('id') id: number) {
    return this.answerService.remove(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  edit(@Req() req: any, @Param('id') id: number, @Body() dto: CreateAnswerDto) {
    return this.answerService.edit(id, req.user, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @UseGuards(JwtAuthGuard)
  @Post()
  add(@Body() dto: CreateAnswerDto) {
    return this.answerService.add(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/vote')
  voteAnswer(
    @Param('id') id: number,
    @Query('rating') rating: string,
    @Req() user: any
  ){
    return this.answerService.voteAnswer(user.user.id, id, rating);
  }
}
