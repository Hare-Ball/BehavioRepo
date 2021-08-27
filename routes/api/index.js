const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const behaviorRoutes = require('./behaviorRoutes');
const teacherRoutes = reqire('./teacherRoutes');

router.use('/students', studentRoutes);
router.use('/behavior', behaviorRoutes);
router.use('/teacher', teacherRoutes);

module.exports = router;
