const { Schema, model } = require('mongoose')

const { handleMongooseError } = require('../helpers')

// schema - вимоги до об'екту

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    // тут буде зберігатися id, яке генерує MongoDB
    type: Schema.Types.ObjectId,
    // ref - це назва колекції, з якої буде це id
    ref: 'user',
    required: true,
  },
}, { versionKey: false });

// middleware для обробки помилок з неправильним статусом
contactSchema.post('save', handleMongooseError)

// модель - класс, який буде працювати з колекцією 'contact'
const Contact = model('contact', contactSchema)

module.exports = Contact;

