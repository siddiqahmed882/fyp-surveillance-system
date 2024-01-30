import { z } from 'zod';
import { config } from 'dotenv';

const safeEnv = z.object({
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  PORT: z.string(),
  DOMAIN: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

class SafeEnv {
  static _instance: z.infer<typeof safeEnv> | null = null;

  private constructor () {
    if (!SafeEnv._instance) {
      config();
      SafeEnv._instance = safeEnv.parse(process.env);
    }
  }

  static get instance() {
    return SafeEnv._instance || new SafeEnv();
  }
}

config();



export default safeEnv.parse(process.env);