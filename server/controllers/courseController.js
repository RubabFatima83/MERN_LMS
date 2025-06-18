const Course = require('../models/course')
const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const createCourse = catchAsyncErrors(async (req, res, next) => {
    const { title, demoUrl, description, level, duration, category, language, isPremium } = req.body

    const course = new Course({
        mentor: req.user._id,
        title,
        demoUrl,
        description,
        level,
        duration,
        // tags: JSON.parse(tags),
        category,
        language,
        isPremium,
        thumbnail: req.file ? req.file.filename : null,
    })

    const saveCourse = await course.save()
    res.status(201).json({
        success: true,
        message: 'Course created successfully!',
        data: saveCourse
    })

})

const getFilter_Options = catchAsyncErrors(async (req, res, next) => {

    const categoryOptions = Course.schema.path('category').enumValues
    const levelOptions = Course.schema.path('level').enumValues
    const languageOptions = Course.schema.path('language').enumValues

    res.status(200).json({
        success: true,
        data: {
            categories: categoryOptions,
            levels: levelOptions,
            languages: languageOptions
        }
    })
})

const updateCourse = catchAsyncErrors(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if (!course) return next(new ErrorHandler('Course not found', 404))

    // Authorization check
    if (req.user.role === 'Mentor' && course.mentor.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not authorized to update this course', 403))
    }

    const updates = req.body

    // Only update fields if present
    if (req.body.title !== undefined && req.body.title !== course.title) {
        updates.title = req.body.title
    }

    if (req.body.demoUrl !== undefined && req.body.demoUrl !== course.demoUrl) {
        updates.demoUrl = req.body.demoUrl
    }

    if (req.body.description !== undefined && req.body.description !== course.description) {
        updates.description = req.body.description
    }

    if (req.body.duration !== undefined && req.body.duration !== course.duration) {
        updates.duration = req.body.duration
    }

    // If a new thumbnail was uploaded
    if (req.file) {
        updates.thumbnail = req.file.filename
        // Optional: delete old thumbnail file if needed
    }

    // If nothing to update
    if (Object.keys(updates).length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No changes made to the course',
            data: course,
        })
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        message: 'Course updated successfully!',
        data: updatedCourse,
    })
})

const getCourses = catchAsyncErrors(async (req, res, next) => {
    const { category, level, language, sort } = req.query;

    const categoryFilter = category ? (Array.isArray(category) ? category : [category]) : [];
    const levelFilter = level ? (Array.isArray(level) ? level : [level]) : [];
    const languageFilter = language ? (Array.isArray(language) ? language : [language]) : [];

    const filterQuery = {
        ...(categoryFilter.length > 0 && { category: { $in: categoryFilter } }),
        ...(levelFilter.length > 0 && { level: { $in: levelFilter } }),
        ...(languageFilter.length > 0 && { language: { $in: languageFilter } }),
    };

    // Build base query
    let coursesQuery = Course.find(filterQuery)
        .populate("mentor", "name profileImage")
        .select("title description thumbnail category level duration isPremium mentor createdAt")

    // Apply sorting
    if (sort === "price") {
        coursesQuery = coursesQuery.sort({ price: 1 })
    } else if (sort === "level") {
        coursesQuery = coursesQuery.sort({ level: 1 }) // Alphabetical
    } else {
        coursesQuery = coursesQuery.sort({ createdAt: -1 }) // Default: newest first
    }

    const courses = await coursesQuery

    if (!courses.length) {
        return res.status(200).json({
            success: true,
            message: "No course found.",
            data: [],
        })
    }

    res.status(200).json({
        success: true,
        message: "Filtered courses fetched successfully!",
        data: courses,
    })
})

const getPremiumCourses = catchAsyncErrors(async (req, res, next) => {
    const { category, level, language, sort } = req.query;

    const categoryFilter = category ? (Array.isArray(category) ? category : [category]) : [];
    const levelFilter = level ? (Array.isArray(level) ? level : [level]) : [];
    const languageFilter = language ? (Array.isArray(language) ? language : [language]) : [];

    const filterQuery = {
        isPremium: true,
        ...(categoryFilter.length > 0 && { category: { $in: categoryFilter } }),
        ...(levelFilter.length > 0 && { level: { $in: levelFilter } }),
        ...(languageFilter.length > 0 && { language: { $in: languageFilter } }),
    };

    let coursesQuery = Course.find(filterQuery)
        .populate("mentor", "name")
        .select("title description thumbnail category level duration mentor createdAt")

    if (sort === "price") {
        coursesQuery = coursesQuery.sort({ price: 1 });
    } else if (sort === "level") {
        coursesQuery = coursesQuery.sort({ level: 1 });
    } else {
        coursesQuery = coursesQuery.sort({ createdAt: -1 });
    }

    const courses = await coursesQuery;

    if (!courses.length) {
        return res.status(200).json({
            success: true,
            message: "No premium courses found.",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Premium courses fetched successfully!",
        data: courses,
    });
});

const getMyCourses = catchAsyncErrors(async (req, res, next) => {
    const courses = await Course.find({ mentor: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        message: 'Mentor courses fetched',
        data: courses
    })
})

const getCourseById = catchAsyncErrors(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate('mentor', 'name email profileImage').populate('lectures')
    if (!course) return next(new ErrorHandler('Course not found', 404))
    res.status(200).json({
        success: true,
        message: 'Course fetched successfully!',
        data: course
    })
})

const deleteCourse = catchAsyncErrors(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if (!course) return next(new ErrorHandler('Course not found', 404))

    if (req.user.role === 'Mentor' && course.mentor.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not authorized to delete this course', 403))
    }

    await course.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Course deleted successfully!'
    })
})

const enrollInCourse = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.user._id; // From auth middleware
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler('Course not found', 404));

    // Check if student is already enrolled by checking studentId in enrolledStudents array
    const alreadyEnrolled = course.enrolledStudents.some(
        (entry) => entry.studentId.toString() === studentId.toString()
    );

    if (alreadyEnrolled) {
        return next(new ErrorHandler('Already enrolled', 400));
    }

    // Add new enrolled student object with studentId and optional enrolledDate
    course.enrolledStudents.push({ studentId, enrolledDate: new Date() });
    await course.save();

    // Update student's enrolledCourses array if not already included
    const student = await User.findById(studentId);
    if (student && !student.enrolledCourses.includes(courseId)) {
        student.enrolledCourses.push(courseId);
        await student.save();
    }

    res.status(200).json({
        success: true,
        message: 'Enrolled successfully!'
    });
});

const getMyProgress = catchAsyncErrors(async (req, res, next) => {

    const studentId = req.user._id;

    const courses = await Course.find({
        'enrolledStudents.studentId': studentId
    }).populate('lectures');

    const enrollments = courses.map(course => {
        const enrollment = course.enrolledStudents.find(e => e.studentId.toString() === studentId.toString());

        const watchedLectures = enrollment?.watchedLectures || [];
        const totalLectures = course.lectures.length || 1;
        const isCompleted = watchedLectures.length === totalLectures;

        return {
            _id: course._id,
            isCompleted,
            watchedLectures,
            course: {
                title: course.title,
                description: course.description,
                lectures: course.lectures,
            }
        };
    });

    res.json({ enrollments });

})


module.exports = { createCourse, getFilter_Options, updateCourse, getCourses, getPremiumCourses, getMyCourses, getCourseById, deleteCourse, enrollInCourse, getMyProgress }
