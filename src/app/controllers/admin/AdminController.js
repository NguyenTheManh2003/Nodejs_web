const courses = require("../../models/courses");
// import chuyen doi oject bang mongoose
const { mongooseToObject } = require("../../../util/mongoose");
const { mutipleMongooseToObject } = require("../../../util/mongoose");
class adminController {
  // [get]/ Courses/:slug
  index(req, res) {
    res.render("admin/home", { layout: "admin" });
  }

  sign_in(req, res) {
    res.render("admin/sign_in", { layout: "admin_yet" });
  }

  sign_up(req, res) {
    res.render("admin/sign_up", { layout: "admin_yet" });
  }

}
module.exports = new adminController();
