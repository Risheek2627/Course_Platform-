const mongoose = require("mongoose");
const User = require("./User");
const Course = require("./Course");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
