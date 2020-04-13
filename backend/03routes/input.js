const express = require('express');
const inputController = require('../02controllers/input');
const isAuth = require('../utils/isAuth');

const router = express.Router();

// Get Inputs
router.get('/input', inputController.getInputs);

// Create Input
router.post('/input', isAuth, inputController.createInput);

// Edit Input
router.put('/input/:id', isAuth, inputController.editInput);

// Get Input
router.get('/input/:id', isAuth, inputController.getInput);

// Delete Input
router.delete('/input/:id', isAuth, inputController.deleteInput);

// Delete Inputs
router.delete('/input', isAuth, inputController.deleteInputs);

module.exports = router;