import express from 'express'
import router from './router.js'
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();
const PORT = 5000;

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

const app = express();
app.use(cors());

app.use(express.json());
app.use(logger)

app.use('/img', express.static('public/img'));

app.use('/api/', router);


app.use(error);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
