// Requiring our models and passport as we've configured it
require("dotenv").config();
var db = require("../models");
var passport = require("../config/passport.js");
console.log("in file")
module.exports = function (app) {
    console.log("in module")
    app.post("/api/signup", function (req, res) {
        console.log("in post again")
        db.User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                console.log(err);
                res.status(401).json(err);
            });
    });
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                fname: req.user.fname,
                id: req.user.id
            });
        }
    });
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/home");
    });
}