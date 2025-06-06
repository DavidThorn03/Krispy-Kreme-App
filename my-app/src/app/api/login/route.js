export async function GET(req, res) {
    console.log("in the api page")
    var dotenv = require('dotenv');
    dotenv.config();
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    console.log(email);
    console.log(pass);

    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS

    const client = new MongoClient(url);
    const dbName = 'RichWeb';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('User');
    const findResult = await collection.find({ email : email }).toArray();
    console.log('Found documents =>', findResult);
    if(findResult.length == 0){
        console.log("email not found");
        return Response.json({data: "invalid"});
    }
    console.log(findResult[0].password);
    const bcrypt = require('bcrypt');
    let hashResult = bcrypt.compareSync(pass, findResult[0].password); // true


    console.log("checking " + findResult[0].password);
    console.log("Hash Comparison Result " + hashResult);
    if(hashResult){
        console.log("login valid")
        return Response.json(findResult);
    } else {
        console.log("login invalid")
        return Response.json({data: "invalid"});
    }
}
