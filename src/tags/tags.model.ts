import { Question } from 'questions/questions.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tag {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок ярлыка' })
  @Column({ unique: true, nullable: false })
  title: string;

  @ApiProperty({ example: 'Описание', description: 'Описание ярлыка' })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({ example: '[]', description: 'Вопросы' })
  @OneToMany(() => Question, (question) => question.tag)
  questions: Question[];
}
