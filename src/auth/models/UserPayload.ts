import { UserType } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  userType: UserType;
  iat?: number;
  exp?: number;
}
