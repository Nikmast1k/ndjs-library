const express = require('express')

const logger = require('./middleware/logger')
const error404 = require('./middleware/err-404')
const indexRouter = require('./routes/index2')
const indexRouter_login = require('./routes/index_login')
const app = express()
app.use(logger)
app.use(express.json())
app.use('/api/books', indexRouter)
app.use('/api/user/login', indexRouter_login)
app.use('/api/books/:id', indexRouter)
app.use('/api/books/:id/download',indexRouter)
app.use(error404)

const PORT = process.env.PORT || 3000
console.log('Server is listening port 3000')

app.listen(PORT)
