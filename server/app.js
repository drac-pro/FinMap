import express, { json } from 'express';
// eslint-disable-next-line no-unused-vars
import dbClient from './config/db';
import router from './routes/authRoutes';

require('dotenv').config();

const app = express();
app.use(json());
app.use('/api/auth', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on  port ${PORT}`);
});
