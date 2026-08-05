import { User } from '../entities/user';
import { UserDto } from './dtos/userDto';
import { UserRepository } from '../infrastructure/repositories/userRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    return user.toDto();
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    const user = new User(userDto.id, userDto.name, userDto.email, userDto.role);
    await this.userRepository.save(user);
    return user.toDto();
  }
}