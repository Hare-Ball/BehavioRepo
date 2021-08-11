const router = require('express').Router();
const studentRoutes = require('./studentRoutes');

router.use('/students', studentRoutes);

module.exports = router;
