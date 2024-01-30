import { z } from 'zod';

export const accessTokenValidator = z.object({
  id: z.number(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  role: z.string()
});

export type AccessTokenDto = z.infer<typeof accessTokenValidator>;