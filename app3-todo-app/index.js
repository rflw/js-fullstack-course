import { MongoClient } from 'mongodb';
import express from 'express';

const app = express();
const dbName = 'TodoApp';
const dbUrl = `mongodb://fullstack-mongodb/${dbName}`;
const dbClient = new MongoClient(dbUrl);
const todoItems = dbClient.db().collection('Items');

const ROUTES = {
  mainpage: '/',
  newItem: '/create-item'
}

app.use(express.urlencoded({ extended: false }));
app.listen(8000);

app.get(ROUTES.mainpage, async (req, res) => {
  const mapToLI = item => `<li>${item.text}</li>`;
  const listItems = await todoItems.find().toArray().then(
    items => items.map(mapToLI).join('')
  );

  res.send(`
    <!DOCTYPE html>
    <head>
    </head>
    <body>
    <h1>TODO App</h1>
    <form action="${ROUTES.newItem}" method="post">
      <div>
        <input type="text" name="newItem">
        <button type="submit">Add new item</button>
      </div>
    </form>
    <ul>
      ${listItems}
    </ul>
    </body>
    </html>
  `);
});

app.post(ROUTES.newItem, async (req, res) => {
  await todoItems.insertOne({ text: req.body.newItem });
  res.redirect(ROUTES.mainpage);
});

