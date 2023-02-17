import { User } from "src/users/users.model";
import { JoinColumn, Entity, ManyToOne, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./questions.model";

@Entity('rating_question')
export class QuestionRating{
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
    @PrimaryColumn({ name: 'question_id' })
    questionId: number;
  
    @ManyToOne(
      () => User,
      user => user.questions,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User[];
  
    @ManyToOne(
      () => Question,
      question => question.user,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
    question: Question[];

    @Column({default: 0})
    rating: number;
}