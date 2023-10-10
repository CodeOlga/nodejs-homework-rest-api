const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// налаштування змінних оточення для всього проекту
require('dotenv').config()

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express()

// налаштування як виводити в консоль, пакет morgan
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// якщо прийде запит на файли - бери його з папки public
// "роздача статики"
app.use(express.static('public'))

// для запитів на реєстрацію/авторизацію  використовуємо usersRouter
app.use('/users', usersRouter)

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
