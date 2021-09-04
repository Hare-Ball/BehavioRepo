const router = require('express').Router();
// use object destructuring to import our two models by name
const { Teacher, Student, Behavior } = require('../../models');

// GET all teachers
router.get('/', async (req, res) => {
    Teacher.findAll({
        attributes: ['teacherName', 'grade'],

    }).then (teacherTable => res.json(teacherTable))
    .catch (err => {
        console.error(err);
        res.status(500).json(err);
    });
});


// GET a single teacher
router.get('/:id', async (req, res) => {
    Teacher.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['teacherName', 'grade']
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
    }).then (teacherTable => res.json(teacherTable))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    
// DELETE a teacher
router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    Product.destroy({
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
