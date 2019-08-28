const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard kat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else {
  app.use(express.static("public"));
}

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/easyatexas");

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;