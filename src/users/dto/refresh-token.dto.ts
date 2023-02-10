import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'dfc88a8e-d687-4691-b97e-e434437150cb',
    description: 'Refresh token',
  })
  readonly refreshToken: string;
}
