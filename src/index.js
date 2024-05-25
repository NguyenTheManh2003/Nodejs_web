const express = require("express");
const { engine } = require("express-handlebars"); // Correct import for the engine method
const morgan = require("morgan");
const methodOverride = require("method-override")
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");

// Sử dụng body-parser middleware để phân tích dữ liệu từ form HTML
app.use(bodyParser.urlencoded({ extended: true }));

// router
const route = require("./router");

const db = require("./config/db");
// connect db
db.connect();
// change http
app.use(methodOverride('_method'))
// tạo đường dẫn tĩnh chứa thư mục
app.use(express.static(path.join(__dirname, "public")));
// console.log("đây là path" + __dirname);

const test = path.join(__dirname);
console.log(test);
// http logger
app.use(morgan("combined"));


// template engine
app.engine(
  "hbs",
  engine({
    // Use 'engine' here instead of 'handlebars'
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// khai báo router
route(app);

app.listen(port, () => {
  console.log(`App listening on port at http://localhost:${port}`);
});
