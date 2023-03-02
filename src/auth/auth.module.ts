import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'redis/redis.module';
import { RolesModule } from 'roles/roles.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    RedisModule,
    RolesModule,
  ],
  exports: [AuthService, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
