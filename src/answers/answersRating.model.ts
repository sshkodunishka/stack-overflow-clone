import { User } from "src/users/users.model";
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Answer } from "./answers.model";

@Entity()
export class AnswerRating{
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
    @PrimaryColumn({ name: 'answer_id' })
    answerId: number;

    @ManyToOne(
        () => User,
        user => user.questions,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User[];

    @ManyToOne(
        () => Answer,
        answer => answer.user,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    @JoinColumn([{ name: 'answer_id', referencedColumnName: 'id' }])
    answer: Answer[];

    @Column({default: 0})
    rating: number;
}