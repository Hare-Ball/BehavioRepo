const router = require('express').Router();
const {Behavior, Student, Action, StudentBehavior, Consequence} = require('../models');




// route to show login
router.get('/', async (req, res) => {
    res.render('login');
});

// route to show login
router.get('/login', async (req, res) => {
    res.render('login');
});


// route to show login
router.get('/Admin', async (req, res) => {

    const dbStudentDATA = await Student.findAll({include:{model:Behavior}});
    const  student  = dbStudentDATA.map(x=>x.get({plain: true}));
     console.log("---> student :" + JSON.stringify (student) );


    res.render('admin', {student, session: req.session});
});


router.get('/logout', async (req, res) => {
        try {
            req.session.destroy(async () => {

                res.render('login');
            });
        } catch (e) {

            console.error(" ++++ " + __filename + " " + e.message);
        }
    }
);

module.exports = router;

