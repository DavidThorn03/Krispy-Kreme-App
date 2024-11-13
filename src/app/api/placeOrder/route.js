export async function GET(req, res) {
// Make a note we are on
// the api. This goes to the console.
    console.log("in the api page")
// get the values
// that were sent across to us.
    const { searchParams } = new URL(req.url)
    const user = searchParams.get('user');
    const productIDs = searchParams.get('product');
    const numProducts = searchParams.get('numProducts');
    const dateTime = searchParams.get('dateTime');
    console.log(user);
    console.log(productIDs);
    console.log(numProducts);
    console.log(dateTime);
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://b00152842:iWSVCle4kfbnFsUg@threadud.ga2og.mongodb.net/?retryWrites=true&w=majority&appName=ThreadUD";
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
    const input = await collection.insertOne({ user : user, productIDs : productIDs, numProducts : numProducts });
    console.log(`A document was inserted with the _id: ${input.insertedId}`);
    // database call goes here
    // at the end of the process we need to send something back.
    return Response.json({ "data":"valid" })
}
