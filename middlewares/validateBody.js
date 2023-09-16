const { HttpError } = require('../helpers')

// Валидація даних з використанням схеми

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    // Перевірка на пусте body
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, 'missing fields'));
    }

    // Перевірка на відсутність будь-якого поля
    if (error) {
    next(HttpError(400, 'missing required ' + error.details[0].context.key + ' field'));
    }
    
    next()
  }

  return func;
}

module.exports = validateBody;