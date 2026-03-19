const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route GET pour le login
router.get('/login', authController.showLoginForm);

// Route POST pour le login
router.post('/login', authController.login);

// Route GET pour le logout
router.get('/logout', authController.logout);

module.exports = router;
