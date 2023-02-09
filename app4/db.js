import { MongoClient } from 'mongodb';

const dbName = 'App4';
const dbUrl = `mongodb://fullstack-mongodb/${dbName}`;
const client = new MongoClient(dbUrl);
const Collections = {
  users: 'users'
}

const db = await dbConnect();

async function dbConnect() {
  const dbClient = await client.connect();
  return dbClient.db();
}

const UsersCollection = () => db.collection(Collections.users);

export {
  dbConnect,
  Collections,
  UsersCollection
}

