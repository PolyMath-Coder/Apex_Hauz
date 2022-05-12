const { Router } = require('express');
const router = Router();

const {
  registerProperty,
  findAllProperty,
  findOneProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/property.controller');

router.post('/', registerProperty);
router.get('/:id', findOneProperty);
router.get('/', findAllProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
