const express = require('express');
const { contactsOperation: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models');

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
