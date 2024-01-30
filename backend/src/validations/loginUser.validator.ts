import { z } from 'zod';

export const loginUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255)
});

export type LoginUserDto = z.infer<typeof loginUserDto>;

