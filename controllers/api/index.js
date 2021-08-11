const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/students', studentRoutes);

module.exports = router;
