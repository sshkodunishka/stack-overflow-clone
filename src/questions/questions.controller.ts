import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';

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

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить вопрос' })
  @ApiResponse({ status: 200, description: 'true' })
  @Delete('/:id')
  remove(@Req() req: any, @Param('id') id: number) {
    return this.questionService.remove(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Редактировать вопрос' })
  @ApiResponse({ status: 200, description: 'true' })
  edit(
    @Req() req: any,
    @Param('id') id: number,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionService.edit(id, req.user, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать вопрос' })
  @ApiResponse({ status: 200, type: Question })
  @Post()
  add(@Body() dto: CreateQuestionDto, @Req() req: any) {
    return this.questionService.add(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sort')
  @ApiOperation({ summary: 'Сортировка вопросов по тэгам' })
  @ApiResponse({ status: 200, type: [Question] })
  sortBytags() {
    return this.questionService.sortBytags();
  }


  @UseGuards(JwtAuthGuard)
  @Post('/:id/vote')
  @ApiOperation({ summary: 'Голосование' })
  @ApiResponse({ status: 200, description: 'true' })
  voteQuestion(
    @Param('id') id: number,
    @Query('rating') rating: string,
    @Req() req: any,
  ) {
    return this.questionService.voteQuestion(req.user.id, id, rating);
  }
}
