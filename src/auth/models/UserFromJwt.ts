import { UserType } from '@prisma/client';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  roles: UserType[];
}
