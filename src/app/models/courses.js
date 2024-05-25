const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// định nghĩa trường nào thì trường đó mới được insert or delete
const courses = new Schema(
  {
    name: { type: String },
    description: { type: String},
    image: { type: String },
    level: {  type: String}
    // createAt: {type:Date, default: Date.now },
    // updateAt: {type:Date, default: Date.now },
    // hỗ trợ tự động tạo realtime
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("courses", courses);
