var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.status(201).json({ messages: 'respond with a resource' });
});

/*  user registration. */
router.post('/register', async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.status(201).json({ user: user });
  } catch (error) {
    next(error);
  }
});

/*  user login. */
router.post('/login', async (req, res, next) => {
  // implement user login logic here
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }
    let result = await user.verifyPassword(password);
    console.log(result);
    return result;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
