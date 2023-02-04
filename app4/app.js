import express from 'express';
// import ejs from 'ejs';

const app = express();

// application settings
// see https://expressjs.com/en/api.html#app.set
// see https://expressjs.com/en/api.html#app.settings.table
app.set('views', 'views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  // renders a view and sends the rendered HTML string to the client
  res.render('home-guest');
});

app.listen(8000);
