import { ApiProperty } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class  CreateUserDto{
  @ApiProperty({example: 'hallsets', description: 'Логин'})
  readonly login: string;
  @ApiProperty({example: '123456', description: 'ПарольЫ'})
  readonly password: string;
  @ApiProperty({example: 'Кристина', description: 'Имя'})
  readonly firstName: string;
  @ApiProperty({example: 'Шкода', description: 'Фамилия'})
  readonly lastName: string;
}