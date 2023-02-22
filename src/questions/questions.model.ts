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
} from 'typeorm';

@Entity()
export class Question {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tag, (tag) => tag.questions)
  tag: Tag;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @Column({ default: 0 })
  rating: number;

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
