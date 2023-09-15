const express = require('express')
const Joi = require('joi')

// const contacts = require('../../models/contacts')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const { HttpError } = require('../../helpers')

const router = express.Router()

//  Joi schema
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})


//  controller - фунція обробник реквестів
router.get('/', async (req, res, next) => {
  try {
      const result = await listContacts();
    // const result = await contacts.listContacts();
  res.status(200).json(result)
  // console.log(result)
  // res.json({ message: 'template message' })
  } catch (error) {
    next(error);  
}
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);

    // console.log(req.params)
    // res.json({ message: 'template message' })
  } catch (error) {
      next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Валидація даних з використанням схеми
    const { error } = addSchema.validate(req.body);
    // Богдан
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
        if (error) {
      throw HttpError(400, 'missing required ' + error.details[0].context.key + ' field');
    }
    const result = await addContact(req.body);

    // res.status(201).json(result);
     const response = {
      id: result.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    res.status(201).json(response);
  // console.log(req.body)
} catch (error) {
      next(error);
  }
  // res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
     if (!result) {
      throw HttpError(404, 'Not found');
     }
    res.status(200).json({
      message: "contact deleted"
    })
  } catch (error) {
      next(error);
  }
  // res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
     // Перевірка, что req.body не пусте
    // if (!req.body) {
      if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }
    // Валидація даних з використанням схеми
  const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required ' + error.details[0].context.key + ' field');
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
      if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  }  catch (error) {
      next(error);
  }
  // res.json({ message: 'template message' })
})

module.exports = router
