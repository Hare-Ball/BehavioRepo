const router = require('express').Router();
const { Student, Project, User } = require('../../models');

router.get('/', async (req, res) => {
    //find all students
    try{
      const studentData = await Student.findAll({
        //include: user?
      });
      res.status(200).json(studentData);
    } catch (err) {
      res.status(500).json(err);
    }
    });

router.get('/:id', async (req, res) => {
    // find one student by its `id` value

    try {
      const studentData = await Student.findByPk(req.params.id, {
        //include: students?
      });
  
      if (!studentData) {
        res.status(404).json({ message: 'No Student found with this id!' });
        return;
      }
  
      res.status(200).json(studentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new student
   try {
    const studentData = await Student.create(req.body);
     res.status(200).json(studentData);
   } catch (err) {
    res.status(400).json(err);
 }
 });

 router.put('/:id', (req, res) => {
    // update a Student by its `id` value
    Student.update(
    //   {
    //    id:req.body.id,
    //    category_name: req.body.category_name 
    //   },
    //   {
    //     where: {
    //       id: req.params.id
    //     }
    //   }
    )
    .then((updatedStudent) => {
      res.json(updatedStudent);
    })
    .catch((err) => res.json(err));
  });

  router.delete('/:id', async (req, res) => {
    // delete a User by its `id` value
    try {
      const studentData = await Student.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!studentData) {
        res.status(404).json({ message: 'No Student found with this id!' });
        return;
      }
  
      res.status(200).json(studentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  

