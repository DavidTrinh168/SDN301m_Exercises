const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const dboper = require('./operations');

const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.log('connected to mongodb')

    const db = client.db('exe2')
    const collection = db.collection('promotions')

    const promotion = {
        name: "Weekend Grand Buffet",
        image: "images/buffet.png",
        label: "New",
        price: "19.99",
        description: "Featuring . . .",
        featured: false
    };

    dboper.insertPromotion(db, promotion, 'promotions')
        .then((result) => {
            console.log("Insert Promotion:\n", result.ops);

            return dboper.findPromotions(db, 'promotions');
        })
        .then((docs) => {
            console.log("Found Promotions:\n", docs);

            return dboper.updatePromotion(db, { name: "Weekend Grand Buffet" },
                { description: "Featuring a variety of dishes..." }, 'promotions');
        })
        .then((result) => {
            console.log("Updated Promotion:\n", result.result);

            return dboper.findPromotions(db, 'promotions');
        })
        .then((docs) => {
            console.log("Found Updated Promotions:\n", docs);

        //     return db.dropCollection('promotions');
        // })
        // .then((result) => {
        //     console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));
}


main()