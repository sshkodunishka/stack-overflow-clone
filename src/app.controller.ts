import { Controller, Get } from '@nestjs/common';
import {
  ApiHideProperty,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Начало')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Приветствие' })
  @ApiResponse({ status: 200, type: 'WELCOME TO PORTAL!!!!!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
