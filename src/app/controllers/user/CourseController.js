const Course = require("../../models/courses");
// import chuyen doi oject bang mongoose
const { mongooseToObject } = require("../../../util/mongoose");

class CoursesController {
  // [get]/ Courses/:slug
  shows(rep, res, next) {
    // dùng query param
    Course.findOne({ slug: rep.params.slug })
      .then((course) => {
        res.render("user/courses_detail", { course: mongooseToObject(course) });
      })
      .catch(next);
  }
}
module.exports = new CoursesController();
