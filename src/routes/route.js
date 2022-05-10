const { Router } = require('express');
const router = Router();

const authRoute = require('./auth.routes');

router.use('/auth', authRoute);

module.exports = router;
