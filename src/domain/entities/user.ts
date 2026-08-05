import { UserDto } from '../../application/dtos/userDto';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string
  ) {}

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}