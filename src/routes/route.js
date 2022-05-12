const { Router } = require('express');
const router = Router();

const authRoute = require('./auth.routes');

router.use('/auth', authRoute);
router.use('/property', require('./property.routes'));

module.exports = router;
