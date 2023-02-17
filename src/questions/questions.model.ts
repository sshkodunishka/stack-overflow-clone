import { ApiProperty } from '@nestjs/swagger';
import { Answer } from 'src/answers/answers.model';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/users.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { QuestionRating } from './questionsRating.model';

@Entity()
export class Question {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tag, (tag) => tag.questions)
  tag: Tag;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(() => User, (user) => user.questions)
  user: User;

  @Column()
  createUserId: number;

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
