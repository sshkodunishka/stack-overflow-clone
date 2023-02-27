import { CanActivate } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../roles/roles.guards';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Repository } from 'typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

describe('RolesController', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;
  let rolesRepository: Repository<Role>;

  beforeEach(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    rolesService = moduleRef.get<RolesService>(RolesService);
    rolesController = moduleRef.get<RolesController>(RolesController);
    rolesRepository = moduleRef.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('getAll', () => {
    it('should return an array of Roles', async () => {
      const result = [
        {
          id: 1,
          roleName: 'test',
          users: [],
        },
      ];
      jest.spyOn(rolesRepository, 'find').mockResolvedValueOnce(result);

      expect(await rolesController.getAll()).toBe(result);
    });
  });
});
