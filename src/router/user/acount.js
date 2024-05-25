const express = require("express");
const route = express.Router();

const acount = require("../../app/controllers/user/accountController");

route.get("/login", acount.showLogin);
route.get("/register", acount.showRegister);

module.exports = route;
