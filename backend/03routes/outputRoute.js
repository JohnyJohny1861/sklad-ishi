const express = require('express');
const outputController = require('../02controllers/output');
const isAuth = require('../utils/isAuth');

const router = express.Router();

// Get Outputs
router.get('/output', outputController.getOutputs);

// Create Output
router.post('/output', isAuth, outputController.createOutput);

// Edit Output
router.put('/output/:id', isAuth, outputController.editOutput);

// Get Output
router.get('/output/:id', isAuth, outputController.getOutput);

// Delete Output
router.delete('/output/:id', isAuth, outputController.deleteOutput);

// Delete Outputs
router.delete('/output', isAuth, outputController.deleteOutputs);

module.exports = router;