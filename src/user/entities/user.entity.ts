import { UserType } from '@prisma/client';

export class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  roles: UserType[];
}
