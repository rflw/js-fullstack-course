import { MongoClient, ObjectId } from 'mongodb';
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
  createItem: '/create-item',
  updateItem: '/update-item',
  deleteItem: '/delete-item'
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static(publicDir)); // root for server files is /assets
app.listen(8000);

app.get(ROUTES.mainpage, async (req, res) => {
  const mapToLI = item => `
    <li id="${item._id}">
      <span class="itemText">${item.text}</span>
      <button onclick="editItemHandler('${item._id}')">Edit</button>
      <button onclick="deleteItemHandler('${item._id}')">Delete</button>
    </li>
  `;
  const findOptions = {
    sort: {_id: -1}
  };
  const listItems = await todoItems.find({}, findOptions).toArray().then(
    items => items.map(mapToLI).join('')
  );

  res.send(`
    <!DOCTYPE html>
    <head>
    </head>
    <body>
    <h1>TODO App</h1>
    <form action="" method="post" onsubmit="submitHandler(event)">
      <div>
        <input type="text" name="newItem">
        <button type="submit">Add new item</button>
      </div>
    </form>
    <ul id="items-list">
      ${listItems}
    </ul>

    <script type="text/javascript" src="/assets/script.js"></script>
    </body>
    </html>
  `);
});

app.post(ROUTES.createItem, async (req, res) => {
  console.log('request', req.body);
  const dbData = await todoItems.insertOne({ text: req.body.text });
  res.json({ _id: dbData.insertedId, text: req.body.text });
});

app.post(ROUTES.updateItem, async (req, res) => {
  await todoItems.findOneAndUpdate(
    {_id: new ObjectId(req.body.id)},
    {$set: {
      text: req.body.text
    }}
  );

  res.send('Success');
});

app.delete(ROUTES.deleteItem, async (req, res) => {
  await todoItems.deleteOne(
    {_id: new ObjectId(req.body.id)}
  );

  res.send('Success');
});
