const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'conFusion';

async function main() {
    let client;
    try {
        // Connect to the MongoDB server
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected correctly to server');

        const db = client.db(dbname);
        const collection = db.collection('dishes');

        // Insert a document
        const insertResult = await collection.insertOne({ "name": "Uthappizza", "description": "test" });
        console.log("After Insert:\n", insertResult.ops);

        // Find all documents
        const docs = await collection.find({}).toArray();
        console.log("Found:\n", docs);

        // Drop the collection
        const dropResult = await db.dropCollection('dishes');
        console.log("Collection dropped:", dropResult);

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        if (client) {
            client.close();
        }
    }
}

main().catch(console.error);