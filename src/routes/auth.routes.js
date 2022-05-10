const { Router } = require('express');

const router = Router();

router.get('/signup', (req, res) => {
  res.status(200).json({ msg: 'this is the signup route...Haha' });
});

router.get('/signin', (req, res) => {
  res.json({ msg: 'this is the sign in route' });
});

module.exports = router;
