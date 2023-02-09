import { Question } from "src/questions/questions.model";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class Answer{
    @ApiProperty({example: '1', description: 'Индефикатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question

    @ApiProperty({example: '0', description: 'Рэйтинг'})
    @Column({default: 0})
    rating: number;

    @ApiProperty({example: 'Ответ', description: 'Ответ на вопрос'})
    @Column({default: 'description'})
    description: string;

    @ApiProperty({example: '2023-02-08', description: 'Дата создания'})
    @CreateDateColumn({type: "date"})
    created: Date

    @ApiProperty({example: '2023-02-08', description: 'Дата обновления'})
    @UpdateDateColumn({type: "date"})
    update: Date
}