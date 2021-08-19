const router = require('express').Router();
const { Student} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newStudent = await Student.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newStudent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const studentData = await Student.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!studentData) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }

    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;