import { User } from '../entities/user';

export class UserRepository {
  async findById(id: string): Promise<User> {
    // Simulate database call
    const users = [
      new User('1', 'John Doe', 'john@example.com', 'admin'),
      new User('2', 'Jane Doe', 'jane@example.com', 'user'),
    ];
    return users.find(user => user.id === id) || Promise.reject('User not found');
  }

  async save(user: User): Promise<void> {
    // Simulate database save
    console.log('User saved:', user);
  }
}