const Contact = require('../models/contact')

const { HttpError, ctrlWrapper } = require('../helpers')

//  controllers

const listContacts = async (req, res) => {
  // завдяки цьому req.user = user; в authenticate.js, тут ми маємо всю інформацію про людину, яка робить запит
  const { _id: owner } = req.user;

  // пагинація для колекції контактів (GET /contacts?page=1&limit=20)
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  // фильтрація контактів по полю favorite (GET /contacts?favorite=true)
  const filter = { owner, favorite: favorite === 'true' };

  const result = await Contact.find(filter, {skip, limit});

  res.status(200).json(result)
}

const getContactById =   async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  
  //  якщо немає такого користувача
    if (!result) {
      throw HttpError(404, 'Not found');
    }
  
    res.status(200).json(result);
}

const addContact = async (req, res) => {
  // кожний контакт буде записаний за певною людиною
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});

    res.status(201).json(result);
}

const removeContact =   async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  
    res.status(200).json({
      message: "contact deleted"
    })
}
  
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  
  if (!result) {
      throw HttpError(404, 'Not found');
  }
  
    res.status(200).json(result);
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  
  if (!result) {
      throw HttpError(404, 'Not found');
  }
  
    res.status(200).json(result);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact)
}