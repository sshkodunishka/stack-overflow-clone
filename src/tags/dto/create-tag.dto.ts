import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'Java', description: 'Заголовок вопроса' })
  readonly title: string;
  
  @ApiProperty({ example: 'ver. 1.0.0', description: 'Текст вопроса' })
  readonly description: string;
}
