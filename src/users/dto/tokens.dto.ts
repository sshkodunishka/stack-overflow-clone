import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    example: 'dfc88a8e-d687-4691-b97e-e434437150cb',
    description: 'Refresh token',
  })
  readonly refreshToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImlpIiwiaWQiOjUsImlhdCI6MTY3NjAxNzIwMCwiZXhwIjoxNjc2MTAzNjAwfQ.jh8HlLSJPg3o21E7Jv6jxTlX2v9kNjE-_GAwV1hF3V4',
    description: 'Acsess token',
  })
  readonly acsessToken: string;
}
