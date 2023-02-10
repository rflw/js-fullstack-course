import { MongoClient } from 'mongodb';

async function dbConnect() {
  const dbUrl = process.env.CONNNECTIONSTRING;
  const client = new MongoClient(dbUrl);

  // TODO: add try..catch
  console.log('db connect')
  const dbClient = await client.connect();
  return dbClient.db();
}

export {
  dbConnect
}

