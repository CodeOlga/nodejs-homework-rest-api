const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')
const { userSubscriptionEnum } = require('../constants');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    //  'starter', 'pro', 'business'
    enum: Object.values(userSubscriptionEnum),
    default: userSubscriptionEnum.STARTER,
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: true,
  }
}, { versionKey: false, timestamps: true })

// middleware для обробки помилок з неправильним статусом
userSchema.post('save', handleMongooseError)

// модель - класс, який буде працювати з колекцією 'user'
const User = model('user', userSchema)

module.exports = User;

