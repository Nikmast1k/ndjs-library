const express = require('express')

// const logger = require('./middleware/logger')
// const error404 = require('./middleware/err-404')
// const indexRouter = require('./routes/index2')
// const indexRouter_login = require('./routes/index_login')
const errorMiddleware = require('./middleware/error')
const crudRouter = require('./routes/crud')
const app = express()
// app.use(logger)
app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use('/crud', crudRouter)
// app.use('/api/books', indexRouter)
// app.use('/api/user/login', indexRouter_login)
// app.use('/api/books/:id', indexRouter)
// app.use('/api/books/:id/download',indexRouter)
// app.use(error404)
app.use(errorMiddleware)


const PORT = process.env.PORT || 3000
console.log('Server is listening port 3000')

app.listen(PORT)
