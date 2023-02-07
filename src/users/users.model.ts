import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  login: string;

  @Column({nullable: false})
  password: string;

  @Column({default: 'firstName'})
  firstName: string;

  @Column({default: 'secondName'})
  secondName: string;
}
