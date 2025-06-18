const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
})

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) next(new ErrorHandler('User not found', 404))

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.file) {
    user.profileImage = req.file.filename; 
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    profileImage: updatedUser.profileImage,
  });
})

module.exports = { getProfile, updateProfile };