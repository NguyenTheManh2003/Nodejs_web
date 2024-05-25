// user
const siteRouter = require("./user/site");
const coursesRouter = require("./user/Course");
const loginRouter = require("./user/acount");
const mycoursesRouter = require("./user/mycourses");
// admin
const adminRouter = require("./admin/admin");

function Router(app) {
  // user
  app.use("/courses", coursesRouter);
  app.use("/acount", loginRouter);
  app.use("/my-courses", mycoursesRouter);
  app.use("/", siteRouter);
  // admin
  app.use("/admin", adminRouter);
}

module.exports = Router;
