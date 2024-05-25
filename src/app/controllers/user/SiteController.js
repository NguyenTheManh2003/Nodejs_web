const Course = require("../../models/courses");
// import chuyen doi oject
const { mutipleMongooseToObject } = require("../../../util/mongoose");
class Sitecontroller {
  index(rep, res) {
    Course.find({})
      .then((courses) => {
        // từ phiện bản 4.7 trở lên của hnadlebar thì khi render dl từ oj phải chuyển đổi
        // courses = courses.map(course => course.toObject())
        res.render("user/home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch((err) => {
        res.status(400).json({ error: "ERROR!" });
      });
  }
}

module.exports = new Sitecontroller();
