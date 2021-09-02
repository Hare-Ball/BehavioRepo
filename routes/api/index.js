const router = require('express').Router();
const userRoutes = require('./userRoutes');
const behaviorRoutes = require('./behaviorRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/students', studentRoutes);
router.use('/behaviors', behaviorRoutes);

module.exports = router;
