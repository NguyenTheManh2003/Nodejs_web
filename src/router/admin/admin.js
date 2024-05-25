const express = require("express");
const route = express.Router();
const admincontroller = require("../../app/controllers/admin/AdminController");


route.get("/login", admincontroller.sign_in);
route.get("/resgister", admincontroller.sign_up);
// courses
route.get("/creater", admincontroller.creater_item);
route.get("/editcourse/:id", admincontroller.edit_course);
// save data create course
route.post("/store", admincontroller.store);
// ListCourses
route.get("/list_courses", admincontroller.list_course);
// update coures
route.put("/updatecourse/:id", admincontroller.update);
// trang home
// Account
route.get("/", admincontroller.index)
module.exports = route;
