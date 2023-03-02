import { ApiProperty } from '@nestjs/swagger';
import { Answer } from 'answers/answers.model';
import { Tag } from 'tags/tags.model';
import { User } from 'users/users.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Question {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '[]', description: 'Ярлык' })
  @ManyToOne(() => Tag, (tag) => tag.questions)
  tag: Tag;

  @ApiProperty({ example: '[]', description: 'Ответы' })
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
  
  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ApiProperty({ example: '0', description: 'Рейтинг' })
  @Column({ default: 0 })
  rating: number;

  @ApiProperty({ example: '[]', description: 'Массив проголосовавших' })
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  ratingArr: Array<{ userId: string; vote: string }>;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок вопроса' })
  @Column({ default: 'title' })
  title: string;

  @ApiProperty({ example: 'Описание', description: 'Описание вопроса' })
  @Column({ default: 'description' })
  description: string;

  @ApiProperty({ example: '2023-02-08', description: 'Дата создания' })
  @CreateDateColumn({ type: 'date' })
  created: Date;

  @ApiProperty({ example: '2023-02-08', description: 'Дата обновления' })
  @UpdateDateColumn({ type: 'date' })
  update: Date;
}
