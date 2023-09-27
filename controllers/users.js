const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env;

const User = require('../models/user')
const { HttpError, ctrlWrapper } = require('../helpers')
const { userSubscriptionEnum } = require('../constants');

// signup
const register = async (req, res) => {
// перед тим, як зареєструвати, дивимось чи є вже така людина в базі
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: hashedPassword});

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  })
}

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  // в моделі User знаходим користувача по email
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong')
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
  throw HttpError(401, 'Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }
  
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  // користувачу, який залогинівся, записуємо токен в базу
  await User.findByIdAndUpdate(user._id, {token})

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

// current
const getCurrent = async (req, res) => {
  const { email, subscription} = req.user;

  res.json({
    email,
    subscription,
  })
}

// logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
}

// update user subscription
const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body;

  if (!Object.values(userSubscriptionEnum).includes(subscription)) {
    throw new HttpError(400, 'Invalid subscription value');
  }
  
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  if (!updatedUser) {
    throw new HttpError(404, 'User not found');
  }

  res.status(200).json(updatedUser);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
}