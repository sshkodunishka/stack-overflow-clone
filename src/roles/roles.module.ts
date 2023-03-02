import { Module, OnModuleInit } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/users.model';
import { Role } from './roles.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [RolesService],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
