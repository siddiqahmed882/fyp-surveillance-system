import { z } from 'zod';
import { Prisma, Role } from '@prisma/client';

export const createUserDto = z.object({
  username: z.string().min(3).max(255).refine((username) => { return !username.match(/\s/g); }, { message: 'Username must not contain any spaces' }),
  email: z.string().email(),
  password: z.string().min(6).max(255).refine((password) => {
    return password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g);
  }, { message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' }),
  role: z.nativeEnum(Role).optional()
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateUserDto = createUserDto.partial();

export type UpdateUserDto = z.infer<typeof updateUserDto>;