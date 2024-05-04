import { UserType } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  roles: UserType[];
  iat?: number;
  exp?: number;
}
