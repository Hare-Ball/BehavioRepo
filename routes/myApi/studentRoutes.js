const router = require('express').Router();
const {Studentx} = require('../../models/index');


router.get('/allStudents', async (req, res) => {
    try {
        const Studentxs = await Studentx.findAll();
        console.log("---> Studentxs :" + JSON.stringify(Studentxs));
        return res.status(200).json(Studentxs);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/insertStudent', async (req, res) => {
    console.log("---> insertStudent :");

    const StudentxInsert = await Student.create({id: Math.round(Math.random()*500), firstName: "yo", lastName: "merito"})
    console.log("---> StudentxInsert :" + StudentxInsert);
    res.status(200).json(StudentxInsert);
})

router.get('/', (req, res) => {
    res.status(200).send('<h1>Root on Studentx-routes</h1>');
})

module.exports = router;