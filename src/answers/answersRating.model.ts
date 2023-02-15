import { User } from "src/users/users.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { Answer } from "./answers.model";

@Entity()
export class AnswerRating{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;
    
    @Column()
    answerId: number;

    @Column({default: 0})
    rate: number
}