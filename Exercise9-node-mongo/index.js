const { MongoClient } = require('mongodb');
const dboper = require('./operation');

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

        // // Insert a document
        // const insertResult = await collection.insertOne({ "name": "Uthappizza", "description": "test" });
        // console.log("After Insert:\n", insertResult.ops);

        // // Find all documents
        // const docs = await collection.find({}).toArray();
        // console.log("Found:\n", docs);

        // // Drop the collection
        // const dropResult = await db.dropCollection('dishes');
        // console.log("Collection dropped:", dropResult);

        // Insert document using operation.js
        const insertedDoc = await dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes");
        console.log("Inserted Document:\n", insertedDoc);

        // Find documents using operation.js
        const foundDocs = await dboper.findDocuments(db, "dishes");
        console.log("Found Documents:\n", foundDocs);

        // Update document using operation.js
        const updateResult = await dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes");
        console.log("Updated Document:\n", updateResult);

        // // Find updated documents using operation.js
        // const updatedDocs = await dboper.findDocuments(db, "dishes");
        // console.log("Found Updated Documents:\n", updatedDocs);

        // Drop the collection again
        const secondDropResult = await db.dropCollection("dishes");
        console.log("Dropped Collection Again: ", secondDropResult);

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        if (client) {
            client.close();
        }
    }
}

main().catch(console.error);
