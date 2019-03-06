// Use .env
require('dotenv').config();

// Base dependencies
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// configs
import errorCodes from '@/config/errorCodes';

// Middlewares
import cors from 'cors';
import loggerMiddleware from '@/middlewares/logger';

// Routes
import indexRoutes from '@/routes/index';
import galleryRoutes from '@/routes/gallery';

// Utils
import ErrorWrapper from '@/utils/ErrorWrapper';

const app = express();
const PORT = process.env.PORT || 4040;
const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/local';

let db;

// Remove x-powered-by header variable
app.disable('x-powered-by');

app.use((req, res, next) => {
  req.db = db;
  next();
});

// Init middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Init Routes
app.use('/', indexRoutes);
app.use('/gallery', galleryRoutes);

// Error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

app.use((req, res, next) => {
  const error = new ErrorWrapper({ ...errorCodes.ROUTE_NOT_FOUND });

  res.status(404).json(error);
});

// MongoDB init
MongoClient.connect(DB_HOST, { useNewUrlParser: true }, (err, database) => {
  if (err) {
    return console.log(err);
  }

  console.log('Database is connected!');
  return db = database.db("gallery");
});

// Listen
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
