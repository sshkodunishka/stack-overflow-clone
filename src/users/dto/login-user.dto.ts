import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'Shkodunishka', description: 'Login' })
  readonly login: string;

  @ApiProperty({ example: 11111, description: 'Password' })
  readonly password: string;
}
