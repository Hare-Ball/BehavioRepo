const router = require('express').Router();


const studentRoutes = require('./api/studentRoutes');
const behaviorRoutes = require('./api/behaviorRoutes');
const teacherRoutes = require('./api/teacherRoutes');
const userRoutes = require('./api/userRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api/behavior', behaviorRoutes);
router.use('/api/teacher', teacherRoutes);
router.use('/api/student', studentRoutes);
router.use('/api/user', userRoutes);

module.exports = router;

