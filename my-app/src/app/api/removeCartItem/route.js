const {ObjectId} = require('mongodb');

export async function GET(req, res) {
    console.log("in the api page")
    const { searchParams } = new URL(req.url)
    const _id = new ObjectId(searchParams.get('_id'));
    console.log(_id);
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Cart');
    const findResult = await collection.deleteOne({ _id : _id});
    console.log('Found documents =>', findResult);
    return Response.json(findResult);
}
