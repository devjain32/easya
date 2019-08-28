var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });
  app.get("/dashboard", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });
  app.get("*", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

};