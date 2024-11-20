export async function GET(req, res) {
    console.log("in the api page")
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    console.log(email);
    console.log(pass);
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://b00152842:kWDcbYMGg9IOfpEt@threadud.ga2og.mongodb.net/?retryWrites=true&w=majority&appName=ThreadUD";
    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
    const findResult = await collection.find({ email : email, password : pass}).toArray();
    console.log('Found documents =>', findResult);
    let valid = false
    if(findResult.length >0 ){
        valid = true;
        console.log("login valid")
    } else {
        valid = false;
        console.log("login invalid")
    }
    return Response.json(findResult);
}
