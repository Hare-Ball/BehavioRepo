const router = require('express').Router();
const {Student} = require('../../models/index');


router.get('/allStudents', async (req, res) => {
    try {
        const students = await Student.findAll();
        console.log("---> students :" + JSON.stringify(students));
        return res.status(200).json(students);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/insertStudent', async (req, res) => {
    console.log("---> insertStudent :");

    const studentInsert = await Student.create({id: Math.round(Math.random()*500), firstName: "yo", lastName: "merito"})
    console.log("---> studentInsert :" + studentInsert);
    res.status(200).json(studentInsert);
})

router.get('/', (req, res) => {
    res.status(200).send('<h1>Root on student-routes</h1>');
})

module.exports = router;