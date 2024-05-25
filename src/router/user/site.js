const express = require("express");
const route = express.Router();

const sitescontroller = require("../../app/controllers/user/SiteController");

// route.get("/:slug", sitescontroller.search);
route.get("/", sitescontroller.index);

module.exports = route;
