import { User } from "src/users/users.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./questions.model";

@Entity()
export class QuestionRating{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User)
    user: User[]

    @ManyToMany(() => Question)
    question: Question[]

    @Column({default: 0})
    rate: number
}