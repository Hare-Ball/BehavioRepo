const router = require('express').Router();
const student_routes = require('./myApi/studentRoutes');
router.use('/api',student_routes);

router.get('/',(req,res)=>{
    res.status(200).send('<h1>Home root</h1>');
})

module.exports = router;