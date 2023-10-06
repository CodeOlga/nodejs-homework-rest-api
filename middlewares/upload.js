const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
  destination: tempDir,
  // filename має сенс писати, якщо хочемо змінити оригінальну назву
  // в даному випадку це просто приклад (нічого не робить тут)
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: multerConfig
})

module.exports = upload;