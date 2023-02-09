import { MongoClient } from 'mongodb';

const dbName = 'App4';
const dbUrl = `mongodb://fullstack-mongodb/${dbName}`;
const client = new MongoClient(dbUrl);

async function dbConnect() {
  // TODO: add try..catch
  console.log('db connect')
  const dbClient = await client.connect();
  return dbClient.db();
}

export {
  dbConnect
}

