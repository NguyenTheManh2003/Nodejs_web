const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// định nghĩa trường nào thì trường đó mới được insert or delete
// them slug-...
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");


const courses = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
    // createAt: {type:Date, default: Date.now },
    // updateAt: {type:Date, default: Date.now },
    // hỗ trợ tự động tạo realtime
  },
  {
    timestamps: true,
  }
);

// add plugin
mongoose.plugin(slug);
// cau hinh overide all cac function trar ve db
courses.plugin(mongooseDelete,{ overrideMethods: 'all', deletedAt:true })


module.exports = mongoose.model("courses", courses);
