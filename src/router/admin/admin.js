const express = require("express");
const route = express.Router();
const admincontroller = require("../../app/controllers/admin/AdminController");
const CoursesController = require("../../app/controllers/admin/CoursesController");

// trang home
route.get("/", admincontroller.index);

// acount
route.get("/login", admincontroller.sign_in);
route.get("/resgister", admincontroller.sign_up);

// add courses
route.get("/creater", CoursesController.creater_item);
// save data create course
route.post("/store", CoursesController.store);

// get data edit
route.get("/editcourse/:id", CoursesController.edit_course);
// update coures
route.put("/updatecourse/:id", CoursesController.update);

// ListCourses
route.get("/list_courses", CoursesController.list_course);
// trash courses
route.get("/trash", CoursesController.showscoursedelete);

// Xóa khóa học
route.delete("/deletecourse/:id", CoursesController.destroy);
// xóa vĩnh viễn
route.delete("/force/deletecourse/:id", CoursesController.forceDestroy);
// restore
route.patch("/restore/:id", CoursesController.restoreCourses);

// select all form
route.post("/courses/handle-form-actions", CoursesController.handleFormActions);


module.exports = route;
