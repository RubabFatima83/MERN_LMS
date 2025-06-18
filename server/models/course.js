const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true, trim: true },
  demoUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  thumbnail: { type: String },

  duration: { type: String },

  price: { type: Number },

  questions: [{ type: String }],

  keyTakeaways: [String],

  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  
  reviews: [
    {
      name: String,
      rating: Number,
      comment: String,
    },
  ],

  enrolledStudents: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enrolledDate: { type: Date, default: Date.now },
    watchedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
  }],

  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },

  category: {
    type: String,
    enum: [
      "Web Development", "Backend Development", "Programming", "Data Science",
      "Machine Learning", "AI", "Cloud", "Cyber Security",
      "Mobile", "Game Development", "Software Engineering", "Other"
    ],
    required: true,
  },

  language: {
    type: String,
    enum: ['English', 'Urdu'],
    required: true,
  },

  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],

  isPremium: {
    type: Boolean,
    default: false,
  }

}, { timestamps: true });


module.exports = mongoose.model('Course', courseSchema)
