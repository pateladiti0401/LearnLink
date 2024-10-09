const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend to access the backend
    methods: ['GET', 'POST'], // Define allowed methods
    credentials: true, // Allow cookies to be sent if needed
  })
)
// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI =
  'mongodb+srv://learnlink:learnlink@cluster0.ptp95.mongodb.net/learnlink'
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(8000)
    console.log('MONGO Conncted')
  })
  .catch((err) => console.log(err))

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)
