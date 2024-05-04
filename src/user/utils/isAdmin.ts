import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

export class IsAdmin {
  constructor(private readonly jwtService: JwtService) {}

  async isAdmin(user: User): Promise<boolean> {
    try {
      const roles = user.roles || [];
      return roles.some((role) => role.toLowerCase() === 'administrador');
    } catch (error) {
      return false;
    }
  }
}
