const Lecture = require('../models/lecture')
const Course = require('../models/course')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const addLecture = catchAsyncErrors(async (req, res, next) => {
    const { courseId } = req.params

    // Check if course exists and belongs to mentor
    const course = await Course.findById(courseId).populate('lectures')
    if (!course) return next(new ErrorHandler('Course not found', 404))

    if (req.user.role === 'Mentor') {
        if (course.mentor.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler('Unauthorized to add lecture to this course', 403))
        }
    }

    const { title, description, duration, videoUrl } = req.body

    if (!videoUrl) {
        return next(new ErrorHandler('Video upload failed or missing', 400))
    }

    const lecture = new Lecture({
        title,
        description,
        videoUrl,
        duration,
        courseId,
        mentorId: req.user._id,
    });

    await lecture.save()

    // Push the new lecture ID into the course
    course.lectures.push(lecture._id)
    await course.save()

    res.status(201).json({
        success: true,
        message: 'Lecture added successfully!',
        data: lecture,
    })
})

const updateLecture = catchAsyncErrors(async (req, res, next) => {
    const updates = { ...req.body }
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
    })

    if (!lecture) return next(new ErrorHandler('Lecture not found', 404))

    res.status(200).json({
        success: true,
        message: 'Lecture updated successfully!',
        data: lecture
    })
})

const getLectures = catchAsyncErrors(async (req, res, next) => {
    const lectures = await Lecture.find().populate('courseId', 'courseName')

    if (lectures.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No lecture found.',
            data: []
        })
    }

    res.status(200).json({
        success: true,
        message: 'All lectures fetched successfully!',
        data: lectures
    })
})

const getLectureById = catchAsyncErrors(async (req, res, next) => {
    const lecture = await Lecture.findById(req.params.id)
    // .populate('mentorId', 'name')
    // .populate('courseId', 'courseName')
    // .populate('enrolledStudents.studentId', 'name email')

    if (!lecture) return next(new ErrorHandler('Lecture not found', 404))
    res.status(200).json({
        success: true,
        message: 'Lecture fetched successfully!',
        data: lecture
    })
})

const getLecturesByCourse = catchAsyncErrors(async (req, res, next) => {

    const { courseId } = req.params;

    // Optional: Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ErrorHandler('Course not found', 404))
    }

    const lectures = await Lecture.find({ courseId });

    res.status(200).json({
        success: true,
        total: lectures.length,
        data: lectures
    })
})

const deleteLecture = catchAsyncErrors(async (req, res, next) => {
    const lecture = await Lecture.findByIdAndDelete(req.params.id)
    if (!lecture) return next(new ErrorHandler('Lecture not found!', 404))
    res.status(200).json({
        success: true,
        message: 'Lecture deleted successfully!'
    })
})

const markLectureCompleted = catchAsyncErrors(async (req, res) => {
    const { courseId, lectureId } = req.params;
    const userId = req.user._id;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const enrollment = course.enrolledStudents.find(en =>
            en.studentId.toString() === userId.toString()
        );

        if (!enrollment) {
            return res.status(403).json({ message: 'You are not enrolled in this course' });
        }

        const alreadyWatched = enrollment.watchedLectures.some(
            lecId => lecId.toString() === lectureId.toString()
        );

        if (!alreadyWatched) {
            enrollment.watchedLectures.push(lectureId);
            await course.save();
        }

        res.status(200).json({ message: 'Lecture marked as completed' });
    } catch (error) {
        console.error('Error marking lecture completed:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = { addLecture, updateLecture, getLectures, getLectureById, getLecturesByCourse, deleteLecture, markLectureCompleted }