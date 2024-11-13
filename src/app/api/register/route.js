export async function GET(req, res) {
// Make a note we are on
// the api. This goes to the console.
    console.log("in the api page")
// get the values
// that were sent across to us.
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("name")
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    const airCode = searchParams.get('airCode')
    const manager = searchParams.get('manager')
    console.log(name);
    console.log(email);
    console.log(pass);
    console.log(airCode);
    console.log(manager);
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://b00152842:iWSVCle4kfbnFsUg@threadud.ga2og.mongodb.net/?retryWrites=true&w=majority&appName=ThreadUD";
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
    const findResult = await collection.find({ email : email}).toArray();
    console.log('Found documents =>', findResult);
    let exists = false
    if(findResult.length >0 ){
        exists = true;
        console.log("userAlready exists")
        return Response.json({ "data":"invalid" })
    }
    const input = await collection.insertOne({ email : email, password : pass, name : name, aircode : airCode, manager : manager });
    console.log(`A document was inserted with the _id: ${input.insertedId}`);
}
