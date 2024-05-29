exports.insertDocument = async (db, document, collection) => {
    try {
        const coll = db.collection(collection);
        await coll.insertOne(document);
        console.log("Document has been inserted into the collection " + collection);
        return await coll.findOne(document);;
    } catch (err) {
        throw err;
    }
};


exports.findDocuments = async (db, collection) => {
    try {
        const coll = db.collection(collection);
        const docs = await coll.find({}).toArray();
        return docs;
    } catch (err) {
        throw err;
    }
};

exports.removeDocument = async (db, document, collection) => {
    try {
        const coll = db.collection(collection);
        const result = await coll.deleteOne(document);
        console.log("Removed the document ", document);
        return result;
    } catch (err) {
        throw err;
    }
};

exports.updateDocument = async (db, document, update, collection) => {
    try {
        const coll = db.collection(collection);

        //print before update
        console.log("Before update document:\n", await coll.findOne(document));

        //update and retun to index.js
        console.log("Updated the document with ", update);
        
        await coll.updateOne(document, { $set: update });
        
        return await coll.findOne(document);;
    } catch (err) {
        throw err;
    }
};
