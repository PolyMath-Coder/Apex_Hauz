const { Router } = require('express');
const router = Router();
const upload = require('../utils/multer');
const {
  registerProperty,
  uploadPropertyImage,
  findAllProperty,
  findOneProperty,
  getPropertyType,
  updateProperty,
  deleteProperty,
} = require('../controllers/property.controller');

const { registerAdvertValidator } = require('../helpers/validate');

const { adminAuthorization, authenticateUser } = require('../helpers/auth');

router.post('/', authenticateUser, registerAdvertValidator, registerProperty);
router.post('/property-image', upload.single('image'), uploadPropertyImage);
router.get('/:id', authenticateUser, findOneProperty);
router.get('/', authenticateUser, findAllProperty);
router.get('/search?', getPropertyType);
router.put('/:id', authenticateUser, updateProperty);
router.delete('/:id', authenticateUser, adminAuthorization, deleteProperty);

module.exports = router;
