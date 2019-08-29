const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Plants collection and inserts the plants below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/easyatexas"
);

const videosSeed = [
    {
        name: "ECO329 Quiz 4 Question 2",
        link: "https://youtu.be/9BkebXFXlQY",
        description: "Disease and test result probabilities"
    }
];

db.Videos
    .remove({})
    .then(() => db.Videos.collection.insertMany(videosSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

// req.body = {
//     tags: ["black", "formal"]
// }

db.Videos.find({ tags: { $all: req.body.tags }})