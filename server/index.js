const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config({ path: './.env' });

const app = express();

// ✅ middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS config
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ✅ Connect to DB
connectDB();

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const announceRoutes = require('./routes/announeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const faqRoutes = require('./routes/faqRoutes')
const termsRoutes = require('./routes/termsRoutes')
const privacyRoutes = require('./routes/privacyRoutes')

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/lecture', lectureRoutes);
app.use('/api/announcement', announceRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/faqs', faqRoutes)
app.use('/api/terms', termsRoutes)
app.use('/api/privacy', privacyRoutes)

// ✅ Error Middleware
app.use(errorMiddleware);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('A Collaborative Learning Platform for Students');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);

// ✅ Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
