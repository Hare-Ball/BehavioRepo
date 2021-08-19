const router = require('express').Router();
const userRoutes = require('./userRoutes');
const behaviorRoutes = require('./behaviourRoutes');
const studentRoutes = require('./studentRoutes');


router.use('/users', userRoutes);
router.use('/behavior', behaviorRoutes);
router.use('/students', studentRoutes);


module.exports = router;
