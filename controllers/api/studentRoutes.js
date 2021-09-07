const router = require('express').Router();
const {Student, Behavior, Teacher, Classroom, StudentBehavior} = require('../../models');
const sequelize = require('../../config/connection');
const Sequelize = require('sequelize');
console.log("++++++ " + __filename)




router.post('/', (req, res) => {
    Student.create({
        student_name: req.body.student_name
    }).then(studentTable => res.json(studentTable))
        .catch(err => {
            console.error(err.message);
            res.status(500).json(err);
        });
});


router.delete('/:id', async (req, res) => {
    try {
        const studentData = await Student.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!studentData) {
            res.status(404).json({message: 'No student found with this id!'});
            return;
        }

        res.status(200).json(studentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete student
router.delete('/:id', (req, res) => {

    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(studentTable => {

        if (!studentTable) {
            res.status(404).json({message: 'No student found with that id!'});
            return;
        }

        res.json(studentTable);
    }).catch(err => {
        console.error(err.message);
        res.status(500).json(err);
    });
});

router.get('/student-detail/:student_id', async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + __filename + '\n+++++++++++ /student-detail/:student_id\'');

    const dbBehaviorData = await Behavior.findAll();
    const behaviors = dbBehaviorData.map(x => x.get({plain: true}));

    const student_id = req.params.student_id;
    const dbStudentData = await Student.findByPk(student_id);
    const student = dbStudentData.get({plain: true});

    const dbStudentBehaviorData = await StudentBehavior.findAll({where: {student_id}, order: [['behavior_Date', 'DESC'],],});
    const  studentBehavior  = dbStudentBehaviorData.map(x => x.get({plain: true}));
     console.log("---> studentBehavior :" + JSON.stringify (studentBehavior) );

    studentBehavior.map(objElement => {
        objElement.behavior_name = function () {
            return null
        }

        for (let i = 0; i < behaviors.length; i++) {
            if (behaviors[i].behavior_id === objElement.behavior_id) {
                objElement.behavior_name = behaviors[i].behavior_name;
            }
        }
    });

    req.session.student_id = req.params.student_id;
    req.session.student_name = student.student_name;
    req.session.student_grade = student.student_grade;


    // HERE --------------------------------------------------------

    res.render('student-detail', {student, studentBehavior, behaviors, session: req.session});
});

router.post('/saveBehavior', async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + __filename + '\n+++++++++++ /saveBehavior');

//Student.save({student_id: req.params.student_id,})

    const {student_id, behavior_id, behavior_note, behavior_date} = req.body;

    console.log("---> req.body.student_id :" + student_id);
    console.log("---> req.body.behavior_id :" + behavior_id);
    console.log("---> req.body.behavior_note :" + behavior_note);
    console.log("---> req.body.behavior_date :" + behavior_date);

    const student = await Student.findByPk(student_id);
    const behavior = await Behavior.findByPk(behavior_id);
    behavior.note = "this is a note";


    // const  result  = await student.addBehavior(behavior,{ through: {
    //     behavior_note: behavior_note ,
    //     behavior_date: behavior_date ,
    // } } );

    // const result = await student.addBehaviors(behavior, {
    //     through: {
    //         behavior_note: behavior_note,
    //         behavior_date: behavior_date,
    //     }
    // });
    // console.log("---> res :" + JSON.stringify(result));

    let maxCounter = await StudentBehavior.max('counter');
    console.log("---> maxCount :" + JSON.stringify(maxCounter));
    maxCounter ++;
    const resultbulkCreate = await StudentBehavior.bulkCreate([{
        counter: maxCounter,
        student_id: student_id,
        behavior_id: behavior_id,
        behavior_date: behavior_date,
        behavior_note: behavior_note
    }]);
    console.log("---> resultbulkCreate :" + JSON.stringify(resultbulkCreate));


});

router.get('/showClassroom/:classroom_id', async (req, res) => {
    try {
        let classroom_id;
        // await req.session.save(() => {
        req.session.classroom_id = req.params.classroom_id;
        // });
        classroom_id = req.params.classroom_id;
        const dbClassroomData = await Classroom.findByPk(classroom_id, {include: Student});
        // await req.session.save(() => {
        req.session.classroom_name = dbClassroomData.classroom_name;
        console.log('session ', req.session)
        // });
        const classroom = dbClassroomData.get({plain: true});
        res.render('classroom', {classroom, session: req.session});

    } catch
        (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
})
;


module.exports = router;

//student.setBehaviors([behavior])
