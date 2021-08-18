  
const router = require('express').Router();
const { Student, Teacher } = require('../models');
const withAuth = require('../utils/auth');

// route to show all students
router.get('/', async (req, res) => {

    const studentData = await Student.findAll({}).catch((err) => { 
        res.json(err);
      });
      const students = studentData.map((student) => student.get({ plain: true }));
      res.render('homepage', { students });
      });


router.get('/teacher/:id', async (req,res)=> {
 try{
    const teacherData = await Teacher.findByPk(req.params.id);
    const teacher = teacherData.get({ plain: true });

    res.render('profile', {
  ...teacher,
    })
  
} catch {
    res.status(500).json(err);  
}
});


router.get('/student/:id', async (req, res) => {
    try {
        const studentData = await Student.findByPk(req.params.id);
        const student = studentData.get({ plain: true });

        res.render('students', {
        ...student,
        })
    } catch {
        res.status(500).json(err);  
    }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const teacherData = await Teacher.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Teacher }],
    });

    const teacher = teacherData.get({ plain: true });
    console.log(teacher)
    res.render('profile', {
      ...teacher,
      logged_in: true
    });
  } catch (err) {
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

