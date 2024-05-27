const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CSDL', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    });
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Lỗi kết nối:", error);
  }
}

module.exports = { connect };
