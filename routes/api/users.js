const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/users')
const { validateBody, authenticate } = require('../../middlewares')
const schemas = require('../../schemas/users')

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

// current
router.get('/current', authenticate, ctrl.getCurrent)

// logout
router.post('/logout', authenticate, ctrl.logout)

// update subscription
router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateUserSubscription);

module.exports = router;