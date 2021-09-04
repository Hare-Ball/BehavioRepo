const router = require('express').Router();
// use object destructuring to import our two models by name
const { Teacher, Student, Behavior } = require('../../models');

// GET all teachers
router.get('/', async (req, res) => {
    Teacher.findAll({
        attributes: { exclude: ['password'] }

    }).then (teacherTable => res.json(teacherTable))
    .catch (err => {
        console.error(err);
        res.status(500).json(err);
    });
});


// GET a single teacher
router.get('/:id', async (req, res) => {
    Teacher.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
        {
            model: Student,
            attributes: ['id', 'student_name', 'student_grade']
        },
        {
            model: Behavior,
            attributes: ['id', 'behavior']
        },
        {
            model: BehaviorNote,
            attributes: ['id', 'behavior_note', 'date_created']
        }
    ]
    }).then (teacherTable => {
        if (!teacherTable) {
            res.status(404).json({ message: 'No teacher found with this id! '});
            return;
        }
        res.json(teacherTable);
    }).catch (err => {
        console.log(err);
        res.status(500).json(err);
    }); 

});

// CREATE a teacher
router.post('/', async (req, res) => {
    Teacher.create ({

        teacherName: req.body.teacherName,
        grade: req.body.grade,
        email: req.body.email
    }).then (teacherTable => {
        res.session.save(() => {
        req.session.teacher_id = teacherTable.id;
        req.session.username = teacherTable.username;
        req.session.loggedIn = true;

        res.json(teacherTable);

        });
    });
});

// teacher login
router.post('/login', (req, res) => {
    Teacher.findOne({ 
        where: {
            email: req.body.email
        }
        }).then (teacherTable => {
            if (!teacherTable) {
                res.status(500).json({ message: 'Teacher please check your email' });
                return;
            }

            const checkPW = teacherTable.checkPassword(req.body.password);
                if (!checkPW) {
                    res.status(500).json({ message: 'Teacher please reenter password'});
                    return;

                }

                req.session.save(() => {
                    req.session.user_id = teacherTable.id;
                    req.session.username = teacherTable.username;
                    req.session.loggedIn = true;

                    res.json({ user: teacherTable, message: 'Logged in'});
                });
        
        });
        });


// teacher logout
router.logout('/:id', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log('logged out');
            res.status(205).end();
        
        });

    } else {
        res.status(404).end();

    }
});

    
// DELETE a teacher
router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    Teacher.destroy({
        where: { 
          id: req.params.id
        }
      }).then(teacherTable => {
  
      if (!teacherTable) {
        res.status(404).json({ message: 'No teacher found with that id!' });
        return;
      }
  
      res.json(teacherTable);
    }).catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

module.exports = router;
