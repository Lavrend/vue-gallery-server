// Use .env
require('dotenv').config();

// Base dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Middlewares
import cors from 'cors';
import loggerMiddleware from '@/middlewares/logger';
import { errorHandler, routeNotFound} from '@/middlewares/errorHandlers';

// Routes
import indexRoutes from '@/routes/index';
import galleryRoutes from '@/routes/gallery';

const app = express();
const PORT = process.env.PORT || 4040;
const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/local';

// Remove x-powered-by header variable
app.disable('x-powered-by');

// Init middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Init Routes
app.use('/', indexRoutes);
app.use('/gallery', galleryRoutes);

// Error handlers --------------------
app.use(errorHandler);
app.use(routeNotFound);
// ------------------------------------

// Connect and Listen
const listen = () => {
  console.log('Database is connected!');

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

  return mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};

connect();
