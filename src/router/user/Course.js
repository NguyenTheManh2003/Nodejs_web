const express = require("express");
const route = express.Router();

const coursescontroller = require("../../app/controllers/user/CourseController");

route.get("/:slug", coursescontroller.shows);

module.exports = route;
