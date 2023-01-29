import { MongoClient } from 'mongodb';
import express from 'express';
import path from 'path';

const app = express();
const dbName = 'TodoApp';
const dbUrl = `mongodb://fullstack-mongodb/${dbName}`;
const dbClient = new MongoClient(dbUrl);
const todoItems = dbClient.db().collection('Items');
const publicDir = path.resolve(path.dirname('./app3-todo-app/index'), 'public');

const ROUTES = {
  mainpage: '/',
  newItem: '/create-item'
};

app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(publicDir)); // root for server files is /assets
app.listen(8000);

app.get(ROUTES.mainpage, async (req, res) => {
  const mapToLI = item => `
    <li>
      ${item.text}
      <button onclick="editItemHandler()">Edit</button>
      <button onclick="deleteItemHandler()">Delete</button>
    </li>
  `;
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

    <script type="text/javascript" src="/assets/script.js"></script>
    </body>
    </html>
  `);
});

app.post(ROUTES.newItem, async (req, res) => {
  await todoItems.insertOne({ text: req.body.newItem });
  res.redirect(ROUTES.mainpage);
});

