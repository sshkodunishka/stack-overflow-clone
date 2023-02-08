import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto{
    @ApiProperty({example: 'Какой фрейм лучше', description: 'Заголовок вопроса'})
    readonly title: string;
    @ApiProperty({example: 'Хочу узнать какие фреймворки лучше', description: 'Текст вопроса'})
    readonly description: string;
    @ApiProperty({example: '2', description: 'Номер ярлыка'})
    readonly tagId: number;
}