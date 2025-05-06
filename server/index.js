const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './.env' })

// Connect to database
connectDB()

const app = express()
app.use(express.json())

// Import Routes
const authRoutes = require('./routes/authRoutes')

// Mount Routes
app.use('/api/auth', authRoutes)

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

