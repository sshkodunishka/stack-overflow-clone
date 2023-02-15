import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  readonly id: number;

  @ApiProperty({ example: 'Shkodunishka', description: 'Login' })
  readonly login: string;

  @ApiProperty({ example: "11111", description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: 'Kristina', description: 'First name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Shkoda', description: 'Last name' })
  readonly lastName: string;
}
