const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    employeeName: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true, required: true },
  },
  {
    versionKey: false,
  }
);

const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
