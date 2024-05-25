const express = require("express");
const route = express.Router();

const mycoursescontroller = require("../../app/controllers/user/MyCoursesController");

route.get("/", mycoursescontroller.showmycourses);

module.exports = route;
