const Joi = require('joi');

const { userSubscriptionEnum, emailRegexp, passwordRegexp } = require('../constants');

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp)
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'missing required email field',
  }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages({
      'string.pattern.base':
        'Field {#label} must be minimum 8 signs, contain big letter and digital',
      'any.required': 'missing required password field',
  }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'missing required email field',
  })
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp)
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'missing required email field',
  }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages({
      'string.pattern.base':
        'Field {#label} must be minimum 8 signs, contain big letter and digital',
      'any.required': 'missing required password field',
    }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(userSubscriptionEnum)) 
    .required()
    .messages({
    'any.required': 'missing required subscription field',
  }),
});

module.exports = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
}
