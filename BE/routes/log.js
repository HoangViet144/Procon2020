const express = require('express');
const router = express.Router();

// include product controller
const log_controller = require('../db/log_controller');

// routes
router.get('/', log_controller.all_logs);
router.post('/create', log_controller.log_create);

module.exports = router;