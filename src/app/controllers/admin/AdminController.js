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

  // [get]/ Courses/creater
  creater_item(req, res) {
    res.render("admin/creater_item", { layout: "admin" });
  }
  // lưu dữ liệu post khóa học
  store(req, res, next) {
    const formData = req.body;
    const course = new courses(formData);
    course
      .save()
      .then((savedCourse) => {
        res.status(201).json(savedCourse); // Gửi phản hồi JSON với bản ghi đã lưu
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Lỗi khi lưu khóa học" }); // Gửi phản hồi lỗi nếu có lỗi xảy ra
      });
  }
  // quản lý khóa họcF
  list_course(req, res, next) {
    courses
      .find({})
      .then((courses) => {
        // chuyển đổi dữ liệu từ mongoose object sang plain object
        // render view với dữ liệu và layout
        res.render("admin/table_courses", {
          layout: "admin",
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch((err) => {
        res.status(400).json({ error: "ERROR!" });
      });
  }
  // lisst courses delete
  showscoursedelete(req, res, next) {
    courses
      .findDeleted({})
      .then((courses) => {
        res.render("admin/trash-courses", {
          layout: "admin",
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch((err) => {
        res.status(400).json({ error: "ERROR!" });
      });
  }

  // [get]/ Courses/edit_courses/:id
  edit_course(req, res, next) {
    courses
      .findById(req.params.id)
      .then((course) =>
        res.render("admin/edit_item", {
          layout: "admin",
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }
  // [PUT]/editcourse/:id
  update(req, res, next) {
    courses
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/list_courses"))
      .catch(next);
  }

  //[delete]  courses/:id
  destroy(req, res, next) {
    courses
      .delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [patch] restore
  restoreCourses(req, res, next) {
    courses
      .restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new adminController();
