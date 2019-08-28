const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoritedVideos: [{ type: Schema.Types.ObjectId, ref: "Videos"}]
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.validPassword = function (plaintext) {
    return bcrypt.compareSync(plaintext, this.password);
};

const User = mongoose.model("User", userSchema);

// User.aggregate([
//     {
//         $lookup:
//         {
//             from: "Videos",
//             localField: "userId",
//             foreignField: "_id",
//             as: "Videos"
//         }
//     }
// ]);

module.exports = User;