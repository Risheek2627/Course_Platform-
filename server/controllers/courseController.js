const Course = require("../models/Course");

// Add course
const addCourse = async (req, res) => {
  try {
    const { title, description, thumbnail, duration, lectures } = req.body;

    if (req.user.role !== "admin" || req.user.rolec !== "instructor") {
      return res.status(401).json({
        message: "Access denied only Admin or Instructors can add the course",
      });
    }
    const course = await Course.create({
      title,
      description,
      thumbnail,
      duration,
      createdBy: req.user.id,
      lectures,
    });
    return res.status(201).json(course);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Course creation failed", error: error.message });
  }
};

// update
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.createdBy.toString() !== req.user.id &&
      r(eq.user.role !== "admin" || req.user.role !== "instructor")
    ) {
      return res.status(401).json({
        message: "Access denied only Admin or Instructors can add the course",
      });
    }

    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Updated Successfully" }, updateCourse);
  } catch (error) {
    return res.status(500).json({ msg: "Update failed", error: error.message });
  }
};

// deleteCourse
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }

    if (
      course.createdBy.toString() !== req.user.id &&
      (req.user.role !== "admin" || req.user.role !== "instructor")
    ) {
      return res.status(401).json({
        message:
          "Access denied only Admins and Instructors can delete the course",
      });
    }

    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
  } catch (error) {}
};

// get course by ID
const singleCourse = async (req, res) => {
  try {
    const courseID = req.body;
    const course = await Course.findById(courseID);

    if (!course)
      return res
        .status(404)
        .json({ message: `Course not found with id ${courseID}` });

    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed" });
  }
};
