import { createServer } from 'http';
import { getRoute } from './route.js';

const app = createServer((req, res) => {
  res.end(getRoute(req.url));
});

app.listen(8000);
