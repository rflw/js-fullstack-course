import express from 'express';
import router from './router.js';

const app = express();


// application settings
app.use(express.static('public'));
app.use('/', router);

// see https://expressjs.com/en/api.html#app.set
// see https://expressjs.com/en/api.html#app.settings.table
app.set('views', 'views');
app.set('view engine', 'ejs');

app.listen(8000);
