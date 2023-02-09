import { ApiProperty } from "@nestjs/swagger";
import { Answer } from "src/answers/answers.model";
import { Tag } from "src/tags/tags.model";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Question{
    @ApiProperty({example: '1', description: 'Индефикатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tag, (tag) => tag.questions)
    tag: Tag

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]

    @ApiProperty({example: '0', description: 'Рэйтинг'})
    @Column({default: 0})
    rating: number;

    @ApiProperty({example: 'Заголовок', description: 'Заголовок вопроса'})
    @Column({default: 'title'})
    title: string;

    @ApiProperty({example: 'Описание', description: 'Описание вопроса'})
    @Column({default: 'description'})
    description: string;

    @ApiProperty({example: '2023-02-08', description: 'Дата создания'})
    @CreateDateColumn({type: "date"})
    created: Date

    @ApiProperty({example: '2023-02-08', description: 'Дата обновления'})
    @UpdateDateColumn({type: "date"})
    update: Date
}