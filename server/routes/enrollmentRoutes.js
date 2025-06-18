// POST /api/enrollment/:lectureId/complete
const express = require('express');
const router = express.Router();
const Course = require('../models/course');
// const Lecture = require('../models/lecture');
const { protect } = require('../middlewares/authMiddleware')

// Mark a lecture as completed
router.post('/:lectureId/complete', protect, async (req, res) => {
  const userId = req.user._id;
  const { lectureId } = req.params;

  try {
    // Find the course that contains the lecture
    const course = await Course.findOne({ lectures: lectureId });

    if (!course) {
      return res.status(404).json({ message: 'Course or lecture not found' });
    }

    // Find the enrolled student in the course
    const studentEntry = course.enrolledStudents.find(
      (entry) => entry.studentId.toString() === userId.toString()
    );

    if (!studentEntry) {
      return res.status(403).json({ message: 'You are not enrolled in this course' });
    }

    // Add lecture to watchedLectures if not already there
    if (!studentEntry.watchedLectures) {
      studentEntry.watchedLectures = [];
    }

    if (!studentEntry.watchedLectures.includes(lectureId)) {
      studentEntry.watchedLectures.push(lectureId);
    }

    await course.save();
    res.status(200).json({ message: 'Lecture marked as complete' });
  } catch (err) {
    console.error('Error marking lecture complete:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
