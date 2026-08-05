import { TestBed } from '@angular/core/testing';
import { UserService } from '../src/application/services/userService';
import { UserRepository } from '../src/infrastructure/repositories/userRepository';
import { User } from '../src/domain/entities/user';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  it('should return user by id', async () => {
    const userDto = await userService.getUserById('1');
    expect(userDto.name).toBe('John Doe');
  });

  it('should create user', async () => {
    const userDto = {
      id: '3',
      name: 'New User',
      email: 'new@example.com',
      role: 'user',
    };
    const createdUserDto = await userService.createUser(userDto);
    expect(createdUserDto.name).toBe('New User');
  });
});