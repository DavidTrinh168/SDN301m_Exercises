const assert = require('assert');

exports.insertPromotion = (db, promotion, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(promotion);
};

exports.findPromotions = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.updatePromotion = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};

exports.removePromotion = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};