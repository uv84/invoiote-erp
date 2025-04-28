const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/middlewaresControllers/createUserController');
const userModel = require('../models/userModel'); // Assuming userModel is defined here

const userController = createUserController(userModel);

router.post('/signup', (req, res) => {
  // Call a signup method in the controller (you'll need to implement it)
  userController.signup(req, res);
});

module.exports = router;
