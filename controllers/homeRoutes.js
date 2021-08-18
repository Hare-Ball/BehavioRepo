  
const router = require('express').Router();
const { Student, Teacher } = require('../models');

// route to show all students
router.get('/', async (req, res) => {
    const studentData = await Student.findAll({}).catch((err) => { 
        res.json(err);
      });
      const students = studentData.map((student) => student.get({ plain: true }));
      res.render('students', { students });
      });


router.get('/behaviorForm/', async (req,res)=> {
  
})


router.get('/student/:id', async (req, res) => {
    try {
        const studentData = await Student.findByPk(req.params.id);
        const student = studentData.get({ plain: true });

        res.render('studentProfile', {
        ...student,
        })
    } catch {
        res.status(500).json(err);  
    }
});

//Trying to get behaviors to show on student page
// router.get('/student/:id', async (req, res) => {
//   const behaviorData = await Behavior.findByPk(re.params.id).catch((err) => { 
//       res.json(err);
//     });
//     const behaviors = behaviorData.map((behavior) => behavior.get({ plain: true }));
//     res.render('students', { behavior });
//     });


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/students');
      return;
    }
  
    res.render('login');
  });

module.exports = router;

