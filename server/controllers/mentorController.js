const Comment = require('../models/comment')
const Course = require('../models/course')
const Lecture = require('../models/lecture')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const getEnrolledStudentsByMentor = catchAsyncErrors(async (req, res, next) => {
  const mentorId = req.params.mentorId;

  // Get courses with lectures + enrolled students
  const courses = await Course.find({ mentor: mentorId })
    .populate('enrolledStudents.studentId', 'name email role')
    .populate('lectures'); // You need lectures for progress calc

  const studentsMap = new Map();

  courses.forEach(course => {
    const totalLectures = course.lectures?.length || 0;

    course.enrolledStudents.forEach(enroll => {
      const student = enroll.studentId;
      if (student && student.role === 'Student') {
        const studentIdStr = student._id.toString();

        if (!studentsMap.has(studentIdStr)) {
          studentsMap.set(studentIdStr, {
            _id: student._id,
            name: student.name,
            email: student.email,
            courses: []
          });
        }

        // Calculate individual progress
        let progress = 0;
        if (totalLectures > 0) {
          const watchedCount = enroll.watchedLectures?.length || 0;
          progress = ((watchedCount / totalLectures) * 100).toFixed(2);
        }

        studentsMap.get(studentIdStr).courses.push({
          courseId: course._id,
          title: course.title,
          progress: parseFloat(progress)
        });
      }
    });
  });

  res.status(200).json({
    success: true,
    students: Array.from(studentsMap.values())
  });
});


const getMentorReports = catchAsyncErrors(async (req, res) => {
  const mentorId = req.user._id;

  const courses = await Course.find({ mentor: mentorId })
    .populate('enrolledStudents.studentId', 'name')
    .populate('lectures'); // populate lectures to know total count

  const studentIdsSet = new Set();

  const courseProgressData = courses.map(course => {
    const totalLectures = course.lectures.length || 1; // avoid division by zero

    // Calculate progress for each enrolled student
    const progresses = course.enrolledStudents.map(e => {
      if (!e.watchedLectures) return 0;
      return (e.watchedLectures.length / totalLectures) * 100;
    });

    // Collect unique student IDs
    course.enrolledStudents.forEach(e => {
      if (e.studentId) studentIdsSet.add(e.studentId._id.toString());
    });

    const avgCompletion = progresses.length
      ? progresses.reduce((a, b) => a + b, 0) / progresses.length
      : 0;

    return {
      course: course.title,
      avgCompletion: Number(avgCompletion.toFixed(2)),
    };
  });

  const totalStudents = studentIdsSet.size;

  const averageCompletion = courseProgressData.length
    ? (courseProgressData.reduce((sum, c) => sum + c.avgCompletion, 0) / courseProgressData.length).toFixed(2)
    : 0;

  const courseDistributionData = courses
    .map(course => ({
      name: course.title,
      value: course.enrolledStudents.length,
    }))
    .filter(c => c.value > 0);

  res.status(200).json({
    totalStudents,
    totalCourses: courses.length,
    averageCompletion,
    courseDistributionData,
    courseProgressData,
  });
})

const getCommentsForMentor = catchAsyncErrors(async (req, res) => {
  const comments = await Comment.find()
    .populate('userId', 'name role')           // student info
    .populate('replies.userId', 'name role')   // who replied (mentor or student)
    .populate('courseId', 'title')              // course info with only the title field
    .populate('lectureId', 'title') 
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: comments });
})

const addReplyToComment = catchAsyncErrors(async (req, res) => {

  const { commentId, content } = req.body;
  if (!commentId || !content) {
    return res.status(400).json({ message: 'Comment ID and content are required' });
  }

  // store replies 
  const reply = {
    content,
    userId: req.user._id,  
    createdAt: new Date(),
  };

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  comment.replies.push(reply);
  await comment.save();

  return res.status(200).json({ message: 'Reply added', reply });

})

module.exports = { getEnrolledStudentsByMentor, getMentorReports, getCommentsForMentor, addReplyToComment }