import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({ example: 'Это все nest', description: 'Ответ на вопрос' })
  readonly description: string;
  @ApiProperty({ example: '2', description: 'Номер вопроса' })
  readonly questionId: number;
  readonly userId: number; 
}
