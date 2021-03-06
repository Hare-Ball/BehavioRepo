const router = require('express').Router();
const {Student, Behavior, Teacher, Classroom} = require('../../models');
// const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Student.findAll({
        attributes: ['student_name', 'student_grade', 'teacher_id'],
        include: [{
            model: Behavior,
            attributes: ['behavior']
        },
            {
                model: BehaviorNote,
                attributes: ['behavior_note']
            }]

    }).then(studentTable => res.json(studentTable))
        .catch(err => {
            console.error(err.message);
            res.status(500).json(err);
        });
});


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
    console.log("---> req.params.student_id :" + JSON.stringify(req.params.student_id));

    const dbStudentData = await Student.findByPk(req.params.student_id, {include: Behavior,});

    const dbBehaviorData = await Behavior.findAll();
    const behaviors = dbBehaviorData.map(x => x.get({plain: true}));

    // HERE --------------------------------------------------------
    const student = dbStudentData.get({plain: true});

    console.log("---> behaviors :" + JSON.stringify(behaviors));
    res.render('student-detail', {student, behaviors, session: req.session});
});

router.post('/saveBehavior', async (req, res) => {
//Student.save({student_id: req.params.student_id,})

    const {student_id, behavior_id} = req.body;

    console.log("---> req.body.student_id :" + student_id);
    console.log("---> req.body.student_id :" + behavior_id);

    const student = await Student.findByPk(student_id);
    const behavior = await Behavior.findByPk(behavior_id);

    student.addBehavior(behavior);


});

router.get('/showClassroom/:classroom_id', async (req, res) => {
    try {
        let classroom_id;
        await req.session.save(() => {
            req.session.classroom_id = req.params.classroom_id;
        });
        classroom_id = req.params.classroom_id;
        const  dbClassroomData  = await Classroom.findByPk(classroom_id, {include: Student});
        await req.session.save(() => {
            req.session.classroom_name = dbClassroomData.classroom_name;
            console.log('session ', req.session)
        });
         console.log("---> dbClassroomData :" + JSON.stringify (dbClassroomData) );
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
