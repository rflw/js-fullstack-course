import express from 'express';
import form from './form.js'

const app = express();
const port = 8000;

// https://expressjs.com/en/5x/api.html#express.urlencoded
const reqestBodyParserMiddleware = express.urlencoded({ extended: false });
app.use(reqestBodyParserMiddleware);

// mainpage
app.get('/', (req, res) => {
  res.send(form);
});

// while form has been send
app.post('/answer', (req, res) => {
  const payload = req.body; // see reqestBodyParserMiddleware
  const userName = payload.name;
  res.send(`Form sent. Thank you <b>${userName}</b>.`);
});

// while direct access to `/answer` using GET method
app.get('/answer', (req, res) => {
  res.send('Nothing here.')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
