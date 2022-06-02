const express = require("express");
const { login, logout } = require("../controllers/auth.controller");

const Router = express.Router();
Router.route("/login").post(login);
Router.route("/logout").post(logout);
// Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
