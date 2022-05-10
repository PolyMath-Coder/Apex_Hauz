const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');

const router = Router();

router.post('/signup', createUser);

router.get('/signin', (req, res) => {
  res.json({ msg: 'this is the sign in route' });
});

module.exports = router;
