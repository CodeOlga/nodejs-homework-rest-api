const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contactsRouter = require('./routes/api/contacts')
const dotenv = require('dotenv')

const app = express()

// налаштування як виводити в консоль, пакет morgan
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// налаштування environment
dotenv.config()

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// для базового url використовуємо contactsRouter
app.use('/api/contacts', contactsRouter)

// 404 error handler. якщо запит прийшов на адресу, яка не існує
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// global error handler. 4 args required!
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})

module.exports = app
