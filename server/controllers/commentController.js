const Comment = require('../models/comment')
const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const addComment = catchAsyncErrors(async (req, res, next) => {
    const { lectureId, courseId, content } = req.body;

    const comment = await Comment.create({
        lectureId,
        courseId,
        content,
        userId: req.user._id
    });

    res.status(201).json({ success: true, comment });

})

const getComments = catchAsyncErrors(async (req, res) => {

    const { lectureId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(lectureId)) {
        return next(new ErrorHandler('Invalid Lecture ID', 400))
    }

    const comments = await Comment.find({ lectureId: new mongoose.Types.ObjectId(lectureId) })
        .populate('userId', 'name role profileImage')
        .populate('replies.userId', 'name role profileImage')
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });

})

const addReply = catchAsyncErrors(async (req, res, next) => {

    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return next(new ErrorHandler('Comment not found', 404))

    comment.replies.push({
        userId: req.user._id,
        content,
    });

    await comment.save();
    res.status(200).json({ success: true, message: 'Reply added' });

})

module.exports = { addComment, getComments, addReply }