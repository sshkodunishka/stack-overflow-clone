/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Answer } from 'src/answers/answers.model';
import { Question } from 'src/questions/questions.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/roles.model';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Индефикатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'hallsets', description: 'Логин' })
  @Column({ unique: true, nullable: false })
  login: string;

  @ApiProperty({ example: '123456', description: 'ПарольЫ' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: 'Кристина', description: 'Имя' })
  @Column({ default: "firstName" })
  firstName: string;

  @ApiProperty({ example: 'Шкода', description: 'Фамилия' })
  @Column({ default: "lastName" })
  lastName: string;

 @OneToMany(()=>Question, (question)=>question.user)
 questions: Question[]

  @ManyToMany(() => Answer, (answer) => answer.user)
  @JoinTable({
    name: 'rating_answer',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'answer_id',
      referencedColumnName: 'id',
    },
  })
  answers: Answer[]

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
