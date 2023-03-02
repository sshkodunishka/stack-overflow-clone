import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'roles/roles.guards';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { User } from 'users/users.model';
import { CreateRoleDto } from './dto/create-role.dto';

describe("RolesController", () => {
  let rolesController: RolesController;

  const mockGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRole: Role = {
    id: 1,
    roleName: 'Admin',
    users: [{} as User]
  };

  const mockRoles: [Role] = [mockRole]

  const mockRoleService = {
    createRole: jest
      .fn()
      .mockImplementation((dto: CreateRoleDto) => {
        return {
          ...mockRole
        };
      }),
    getAllRoles: jest
      .fn()
      .mockImplementation(() => {
        return [...mockRoles]
    })
  };

  const mockRoleDto = {
    id: 1,
    roleName: 'Admin'
  }

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService
      ],
    })
    .overrideGuard(RolesGuard)
    .useValue(mockGuard)
    .overrideGuard(JwtAuthGuard)
    .useValue(mockGuard)
    .overrideProvider(RolesService)
    .useValue(mockRoleService)
    .compile();

    rolesController = moduleRef.get<RolesController>(RolesController);
  });

  it("should create a role", () => {
    expect(rolesController.create(mockRoleDto)).toEqual({
      id: expect.any(Number),
      ...mockRole,
    });
  });
  it("should get all roles", () => {
    expect(rolesController.getAll()).toEqual(mockRoles);
  });
});