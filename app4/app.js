import express from 'express';
import router from './router.js';
import { dbConnect } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const db = await dbConnect();
const app = express();

console.log('app init');
app.use(express.urlencoded({ extended: false })); // allows to get access `req.body`, see https://expressjs.com/en/api.html#express.urlencoded
app.use(express.json()); // allows to get access req.body based on JSON payloads, see https://expressjs.com/en/api.html#express.json
app.use(express.static('public')); // sets static directory
app.use('/', router); // binds routes

// see https://expressjs.com/en/api.html#app.set
// see https://expressjs.com/en/api.html#app.settings.table
app.set('views', 'views');
app.set('view engine', 'ejs');

app.listen(process.env.PORT);

export {
  db,
  app
};
