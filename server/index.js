const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const errorMiddleware = require('./middlewares/errorMiddleware')

// Load env vars
dotenv.config({ path: './.env' })

// Connect to database
connectDB()

const app = express()

// Connect frontend and backend
app.use(
    cors({
        origin: [process.env.FRONTEND_URI],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import Routes
const authRoutes = require('./routes/authRoutes')

// Mount Routes
app.use('/api/auth', authRoutes)

// Error Middleware
app.use(errorMiddleware)

// Test route
app.get('/', (req, res) => {
    res.send('A Collaborative Learning Platform for Students')
});

// Server
const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    // Close server & exit process
    server.close(() => process.exit(1))
})

