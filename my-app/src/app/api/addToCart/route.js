export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
        console.log("in the api page")
    // get the values
    // that were sent across to us.
        const { searchParams } = new URL(req.url)
        const user = searchParams.get("user")
        const product = searchParams.get('product')
        const price = searchParams.get('price')
        console.log(user);
        console.log(product);
        const { MongoClient } = require('mongodb');
        const url = "mongodb+srv://b00152842:kWDcbYMGg9IOfpEt@threadud.ga2og.mongodb.net/?retryWrites=true&w=majority&appName=ThreadUD";
        const client = new MongoClient(url);
        const dbName = 'RichWeb';
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('Cart');
        const input = await collection.insertOne({user : user, product : product, price : price});
        console.log(`A document was inserted with the _id: ${input.insertedId}`);
        return Response.json({ "data":"valid" })
    }
    