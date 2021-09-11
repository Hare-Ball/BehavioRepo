const router = require('express').Router();
const {Behavior, Student, Action, StudentBehavior, Consequence} = require('../models');
const GoogleSignIn  = require('google-sign-in');

  
const sequelize = require('../config/connection');
const router = require('express').Router();
const { Student, Teacher, Behavior, BehaviorNote } = require('../models');
// const withAuth = require('../utils/auth');

// route to teacher all 
router.get('/', async (req, res) => {
  Teacher.findAll({
    attributes: ['id', 'teacherName', 'grade', 'email'],
  }).then (teacherTable => res.json(teacherTable))
  .catch (err => {
      console.error(err);
      res.status(500).json(err);
  });
});


    
router.get('/teacher/:id', (req,res)=> {
  Teacher.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'teacherName', 'grade', 'email'],
    include: [
      {
        model: Student,
        attributes: ['id','student_name', 'student_grade'],
        include: {
            model: BehaviorNote,
            attributes: ['id', 'behavior_note', 'date_created'],
        }
      },
      {
        model: Behavior,
        attributes: ['behavior'],
        through: BehaviorNote,
        as: 'behavior'
      }
    ]
  }).then (teacherTable => {
    const teachers = teacherTable.map(teacher => teacher.get({ plain: true }));
    res.render('homepage', { teachers, loggedIn: req.session.loggedIn });
  
}).catch(err => {
  console.log(err);
  res.status(500).json(err);  
});
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


// router.get('/student/:id', async (req, res) => {
//     try {
//         const studentTable = await Student.findByPk(req.params.id);
//         const student = studentTable.get({ plain: true });

//         res.render('students', {
//         ...student,
//         })
//     } catch {
//         res.status(500).json(err);  
//     }
// });

// router.get('/profile', async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const teacherTable = await Teacher.findAll({}).catch((err)=> {

//     });

//     const teacher = teacherTable.get({ plain: true });
//     console.log(teacher)
//     res.render('profile', {
//       ...teacher,
//       // logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
      res.redirect('/');
      return;
    }
);



router.get('/logoutGoogle', async (req, res) => {
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

























