import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from '../users/users.model';
import { Question } from '../questions/questions.model';

@Entity()
export class Answer {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @ApiProperty({ example: '0', description: 'Рэйтинг' })
  @Column({ default: 0 })
  rating: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  ratingArr: Array<{ userId: string; vote: string }>;

  @ApiProperty({ example: 'Ответ', description: 'Ответ на вопрос' })
  @Column({ default: 'description' })
  description: string;

  @ApiProperty({ example: '2023-02-08', description: 'Дата создания' })
  @CreateDateColumn({ type: 'date' })
  created: Date;

  @ApiProperty({ example: '2023-02-08', description: 'Дата обновления' })
  @UpdateDateColumn({ type: 'date' })
  update: Date;
}
