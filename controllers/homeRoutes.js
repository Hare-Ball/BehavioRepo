const router = require('express').Router();
const { Student, Behavior } = require('../models');

router.get('/', async (req, res) => {
    try {
        const studentData = await Student.findAll();
        const students = studentData.map((student) => student.get({ plain: true }));
        res.render('homepage', {students});

    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/student/:id', async (req, res) => {
    try {
        const studentData = await Student.findByPk(req.params.id);
        const student = studentData.get({ plain: true });

        res.render('student', {
        ...student,
        })
    } catch {
        res.status(500).json(err);  
    }
});

module.exports = router;