const Announcement = require('../models/announcement')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const createAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = new Announcement({
        ...req.body,
        postedBy: req.user._id,
    })
    const saveAnnouncement = await announcement.save()
    res.status(201).json({
        success: true,
        message: 'Announcement created successfully!',
        data: saveAnnouncement
    })
})

const updateAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const updates = { ...req.body }
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
    })

    if (!announcement) return next(new ErrorHandler('Announcement not found!', 404))

    res.status(200).json({
        success: true,
        message: 'Announcement updated successfully!',
        data: announcement
    })
})

const getAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const announcements = await Announcement.find({ postedBy: req.user._id }).populate('courseId assignmentId lectureId')

    if (announcements.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No announcements found.',
            data: []
        })
    }

    res.status(200).json({
        success: true,
        message: 'All announcements fetched successfully!',
        data: announcements
    })
})

const getAnnouncementById = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id).populate('courseId', 'courseName')
    if (!announcement) return next(new ErrorHandler('Announcement not found!', 404))
    res.status(200).json({
        success: true,
        message: 'Announcement fetched successfully!',
        data: announcement
    })
})

const deleteAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findByIdAndDelete(req.params.id)
    if (!announcement) return next(new ErrorHandler('Announcement not found!', 404))
    res.status(200).json({
        success: true,
        message: 'Announcement deleted successfully!'
    })
})


module.exports = { createAnnouncement, updateAnnouncement, getAnnouncements, getAnnouncementById, deleteAnnouncement }