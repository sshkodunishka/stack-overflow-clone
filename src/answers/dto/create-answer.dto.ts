import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({ example: 'Ответ', description: 'Ответ на вопрос' })
  readonly description: string;
  @ApiProperty({ example: '1', description: 'Номер вопроса' })
  readonly questionId: number;
}
