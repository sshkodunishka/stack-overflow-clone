import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  readonly id: number;

  @ApiProperty({ example: 'Admin', description: 'Name of Role' })
  readonly roleName: string;
}
