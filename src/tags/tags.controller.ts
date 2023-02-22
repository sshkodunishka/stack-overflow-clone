import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guards';
import { title } from 'process';

@ApiTags('Ярлыки')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @ApiOperation({ summary: 'Все ярлыки' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Get()
  getAll() {
    return this.tagsService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать ярлык' })
  @ApiResponse({ status: 200, type: Tag })
  @Post()
  create(@Body() tagDto: CreateTagDto) {
    return this.tagsService.createTag(tagDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить ярлык' })
  @ApiResponse({ status: 200, type: Tag })
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.tagsService.remove(id);
  }

  @ApiOperation({ summary: 'Получить один ярлык' })
  @ApiResponse({ status: 200, type: Tag })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @ApiOperation({ summary: 'Все вопросы по одному ярлыку' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Get('/questions/:title')
  getQuestions(@Param('title') title: string) {
    return this.tagsService.findAllQuestion(title);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Редактировать ярлык' })
  @ApiResponse({ status: 200, type: Tag })
  @Put('/:id')
  edit(@Param('id') id: number, @Body() tagDto: CreateTagDto) {
    return this.tagsService.editTag(id, tagDto);
  }
}
