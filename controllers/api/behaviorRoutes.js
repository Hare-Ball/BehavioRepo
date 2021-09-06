const router = require('express').Router();
const {Behavior, Student,} = require('../../models');


// get behaviors
router.get('/showDetail/:behavior_id', async (req, res) => {
    const student_id = req.session.student_id;
    const behavior_id = req.params.behavior_id;
    const dbStudentData = await Student.findAll({
        where:
            {student_id: student_id},
        include: {
            model: Behavior,
            where: {
                behavior_id: behavior_id
            }
        }
    })

    console.log("---> dbStudentData :" + JSON.stringify(dbStudentData));


    let studentBehavior = dbStudentData.map(x => {
        return x.get({plain: true});
    });
    console.log("---> req.session :" + JSON.stringify(req.session));


    //studentBehavior = [{"student_id": 9,"student_name": "Lianne Carson","student_grade": 9}]
    console.log("---> studentBehavior :" + JSON.stringify(studentBehavior));


    res.render('behavior-detail', {studentBehavior, session: req.session});
});

module.exports = router;