const express = require('express');
const adminController = require('../02controllers/Admin');
const isAuth = require('../utils/isAuth');

const router = express.Router();


////////////////////////////////////////////////////////////////////////////////////////////////
// Log In
router.post('/admin/login', adminController.login);

// // Sign Up
// router.post('/admin/signup', adminController.signup);

// Admin Edit Admin
router.put('/admin/:id', isAuth, adminController.editAdmin);

// Admin Get Admin
router.get('/admin/:id', isAuth, adminController.getAdmin);

// Admin Get Admins
router.get('/admin', isAuth, adminController.getAdmins);

module.exports = router;