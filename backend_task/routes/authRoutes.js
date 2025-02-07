const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // For protected routes

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authMiddleware, getUsers); // Protecting this route

module.exports = router;
