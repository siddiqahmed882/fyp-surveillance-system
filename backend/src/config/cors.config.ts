import type { CorsOptions } from 'cors';

const whitelist = ['http://127.0.0.1:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // ? origin is undefined when the request originates from the same server OR when the request does not originate from a browser (e.g. Postman)
    if (origin == null || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export { whitelist, corsOptions };
