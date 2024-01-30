import path from 'path';

import safeEnv from './config/safeEnv';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import cors from 'cors';
import credentials from './middlewares/credentials';
import { corsOptions } from './config/cors.config';
import apiRoutes from './routes/v1/index.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

const __dirname = path.resolve();
console.log(__dirname);

// middleware to set access control headers
app.use(credentials);

// middleware to enable cors
app.use(cors());

// middlewares to parse json and urlencoded data to req.body
app.use(express.json());
app.use(express.urlencoded({}));

// middleware to parse cookies from request headers
app.use(cookieParser());

// middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRoutes);

// catch-all route handler for any requests to an unknown route
app.all('*', (request, response) => {
  response.status(404);
  if (request.accepts('json')) {
    response.json({ message: '404 Not Found' });
  } else {
    response.type('txt').send('404 Not Found');
  }
});

// middleware to handle errors
app.use(errorHandler);

app.listen(safeEnv.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
