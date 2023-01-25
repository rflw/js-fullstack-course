import { MongoClient } from 'mongodb';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/create-item" method="post">
      <div>
        <input type="text" name="newItem">
        <button type="submit">Add new item</button>
      </div>
    </form>
  `);
});

app.post('/create-item', (req, res) => {
  console.log(req.body.newItem)
  res.send('Form submit.')
});

app.listen(8000);


// const url = "mongodb://fullstack-mongodb"

// MongoClient.connect(
//   url,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     console.log('trying to connect');

//     if (err) {
//       return console.log(err)
//     }

//     // Specify the database you want to access
//     const db = client.db('Example')

//     console.log(`MongoDB Connected: ${url}`)
//   }
// )