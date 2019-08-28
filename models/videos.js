const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videosSchema = new Schema({
    // userId: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true }
})

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;