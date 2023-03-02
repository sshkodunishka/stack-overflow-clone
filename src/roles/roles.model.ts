import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'users/users.model';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @ApiProperty({ example: '1', description: 'Роль' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Имя роли' })
  @Column()
  roleName: string;

  @ApiProperty({ example: '[]', description: 'Пользователи' })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
