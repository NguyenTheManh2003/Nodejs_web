const courses = require("../../models/courses");
// import chuyen doi oject bang mongoose
const { mongooseToObject } = require("../../../util/mongoose");
const { mutipleMongooseToObject } = require("../../../util/mongoose");
class CoursesController {

  // [post]/admin/creater  
  creater_item(req, res) {
    res.render("admin/creater_item", { layout: "admin" });
  }
  // lưu dữ liệu post khóa học [post]/admin/store
  store(req, res, next) {
    const course = new courses(req.body);
    course
      .save()
      .then(() => res.redirect("/admin/list_courses"))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Lỗi khi lưu khóa học" }); // Gửi phản hồi lỗi nếu có lỗi xảy ra
      });
  }
  // quản lý khóa học [get]/admin/list_courses
  list_course(req, res, next) {
    Promise.all([
      courses.find({}), // Lấy tất cả các khóa học
      courses.countDocumentsDeleted({ deletedAt: { $exists: true } }), // Đếm chỉ các khóa học đã bị xóa và chưa được khôi phục
    ])
      .then(([courses, deleteCount]) => {
        console.log("số phần tử:-------------------------" + deleteCount);
        res.render("admin/table_courses", {
          layout: "admin",
          deleteCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);

    // courses.countDocumentsDeleted()
    //   .then((deleted) => {
    //     console.log(deleted)
    //   })

    // courses.find({})
    //   .then((courses) => {
    //     // chuyển đổi dữ liệu từ mongoose object sang plain object
    //     // render view với dữ liệu và layout
    //     res.render("admin/table_courses", {
    //       layout: "admin",
    //       courses: mutipleMongooseToObject(courses),
    //     });
    //   })
    //   .catch((err) => {
    //     res.status(400).json({ error: "ERROR!" });
    //   });
  }
    // khóa học đã xóa [get]/admin//trash
  showscoursedelete(req, res, next) {
    courses
      .findDeleted({ deleted: true }) // chỉ lấy các khóa học đã bị xóa
      .then((deletedCourses) => {
        // If successful, render the "admin/trash-courses" view
        res.render("admin/trash-courses", {
          layout: "admin",
          courses: mutipleMongooseToObject(deletedCourses), // Convert courses to plain objects
        });
      })
      .catch((err) => {
        // If an error occurs, respond with a 400 status and error message
        res.status(400).json({ error: "ERROR!" });
      });
  }

  // [get]admin/editcourse/:id
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

  // [PUT]admin/updatecourse/:id
  update(req, res, next) {
    courses
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/list_courses"))
      .catch(next);
  }

  //[delete] admin/deletecourse/:id"
  destroy(req, res, next) {
    courses
      .delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  

  //[delete]  admin/force/deletecourse/:id
  forceDestroy(req, res, next) {
    courses
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [patch] admin/restore/:id"
  restoreCourses(req, res, next) {
    courses
      .restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch((err) =>
        res.status(500).json({ success: false, error: err.message })
      );
  }
  // handleFormActions [post] admin/courses/handle-form-actions

  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "restore":
        // la mag nen cain them $in:
        courses
          .restore({ _id: { $in: req.body.coursesId } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
        case "delete":
          // la mag nen cain them $in:
          courses
            .delete({ _id: { $in: req.body.coursesId } })
            .then(() => res.redirect("back"))
            .catch(next);
          break;
          case "deleteFocus":
            // la mag nen cain them $in:
            courses
              .deleteOne({ _id: { $in: req.body.coursesId } })
              .then(() => res.redirect("back"))
              .catch(next);
            break;
      default:
        res.json({ message: "action is invalid" });
    }
  }
}

module.exports = new CoursesController();