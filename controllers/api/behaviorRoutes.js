const router = require('express').Router();
const {Behavior, Student, Action, StudentBehavior, Consequence} = require('../../models');


// get behaviors
router.get('/showDetail/:behavior_idcounter', async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + __filename + '\n+++++++++++ showDetail/:behavior_id');
    const behavior_idcounter = req.params.behavior_idcounter;
    console.log("---> behavior_idcounter :" + JSON.stringify(behavior_idcounter));
    let behavior_idcounterArray = behavior_idcounter.toString().split('.');


    const student_id = req.session.student_id;
    const behavior_id = behavior_idcounterArray[0]; // 1
    const counter = behavior_idcounterArray[1];   //20
    req.session.behavior_id = behavior_id;

    const dbStudentDATA = await Student.findByPk(student_id);
    const student = dbStudentDATA.get({plain: true});
    console.log("---> student :" + JSON.stringify(student));

    const dbBehaviorDATA = await Behavior.findByPk(behavior_id);
    const behavior = dbBehaviorDATA.get({plain: true});
    console.log("---> behavior :" + JSON.stringify(behavior));

    const dbStudentBehaviorData = await StudentBehavior.findOne({where: {counter, student_id, behavior_id}});

    const StudentBehavior2 = dbStudentBehaviorData.get({plain: true});
    console.log("---> studentBehavior :" + JSON.stringify(StudentBehavior2));


    behavior.StudentBehavior = () => {
        return null;
    }
    behavior.StudentBehavior = StudentBehavior2;

    student.Behaviors = () => {
        return null;
    }
    student.Behaviors = [behavior];

    const studentBehavior = [student];
    console.log("---> studentBehavior :" + JSON.stringify(studentBehavior));


    console.log("---> studentBehavior[0].Behaviors[0].StudentBehavior.counter :" + JSON.stringify(studentBehavior[0].Behaviors[0].StudentBehavior.counter));
    const dbConsequencesDATA = await Consequence.findByPk(studentBehavior[0].Behaviors[0].StudentBehavior.counter);
    console.log("---> dbConsequencesDATA :" + JSON.stringify(dbConsequencesDATA));


    let consequences;
    if (dbConsequencesDATA) {
        //DATA EXIST
        console.log("---> !== null :");
        consequences = dbConsequencesDATA.get({plain: true});
    } else {
        //EMPTY DATA
        consequences = {counter: 0, action_date: "", action_name: "", action_note: ""}
        console.log("--->  null :");
    }

    const dbActionsDATA = await Action.findAll();
    const actions = dbActionsDATA.map(x => x.get({plain: true}));

    res.render('behavior-detail', {studentBehavior, actions, consequences, session: req.session});
});


router.post('/saveAction', async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + __filename + '\n+++++++++++ saveAction');

    const counter = req.body.counter;
    const action_date = req.body.action_date;
    const action_name = req.body.action_id;
    const action_note = req.body.action_note;
    const student_id = req.body.student_id;
    const behavior_id = req.body.behavior_id;


    const dbStudentDATA = await Student.findByPk(student_id);
    const student = dbStudentDATA.get({plain: true});

    const dbBehaviorDATA = await Behavior.findByPk(behavior_id);
    const behavior = dbBehaviorDATA.get({plain: true});

    const dbStudentBehaviorData = await StudentBehavior.findOne({where: {counter, student_id, behavior_id}});
    const StudentBehavior2 = dbStudentBehaviorData.get({plain: true});


    behavior.StudentBehavior = () => {
        return null;
    }
    behavior.StudentBehavior = StudentBehavior2;

    student.Behaviors = () => {
        return null;
    }
    student.Behaviors = [behavior];

    const studentBehavior = [student];


    let consequence;

    consequence = await Consequence.findByPk(counter);

    if (!consequence) {

        consequence = await Consequence.create({counter, action_date, action_name, action_note})

    }

        consequence = consequence.get({plain: true});
    console.log("---> studentBehavior :" + JSON.stringify(studentBehavior));
    console.log("---> consequence :" + JSON.stringify(consequence));


    res.render('behavior-detail-final', {studentBehavior, consequence, session: req.session});
});

module.exports = router;




































