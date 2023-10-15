const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/users')
const { validateBody, authenticate, upload } = require('../../middlewares')
const schemas = require('../../schemas/users')

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

// verification email
router.get('/verify/:verificationToken', ctrl.verifyEmail)

// resend email
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail)

// signin(login)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

// current
router.get('/current', authenticate, ctrl.getCurrent)

// logout
router.post('/logout', authenticate, ctrl.logout)

// update subscription
router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateUserSubscription);

// update avatar
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router;