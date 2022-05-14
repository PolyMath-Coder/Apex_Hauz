const { Router } = require('express');
const router = Router();
const {
  registerProperty,
  findAllProperty,
  findOneProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/property.controller');

const { adminAuthorization, authenticateUser } = require('../helpers/auth');

router.post('/', authenticateUser, adminAuthorization, registerProperty);
router.get('/:id', authenticateUser, findOneProperty);
router.get('/', authenticateUser, findAllProperty);
router.put('/:id', authenticateUser, adminAuthorization, updateProperty);
router.delete('/:id', authenticateUser, adminAuthorization, deleteProperty);

module.exports = router;
