const router = require('express').Router();
const {Behavior, Student, Action, StudentBehavior, Consequence} = require('../../models');


// get behaviors
router.get('/showDetail/:behavior_id', async (req, res) => {
    const student_id = req.session.student_id;
    const behavior_id = req.params.behavior_id;
    req.session.behavior_id = behavior_id;

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

    let studentBehavior = dbStudentData.map(x => {
        return x.get({plain: true});
    });
    console.log("--> studentBehavior :" + JSON.stringify(studentBehavior));

    const dbActionsDATA = await Action.findAll();
    const actions = dbActionsDATA.map(x => x.get({plain: true}));


    res.render('behavior-detail', {studentBehavior, actions, session: req.session});
});


router.post('/saveAction', async (req, res) => {
//Student.save({student_id: req.params.student_id,})

    const {action_id, action_note, action_date, counter} = req.body;
    console.log("---> counter :" + JSON.stringify(counter));
    console.log("---> action_id :" + (action_id));
    console.log("---> action_note :" + (action_note));
    console.log("---> action_date :" + (action_date));


    const dbConsequencesData = await Consequence.create({counter, action_date, action_name: action_id, action_note});
    console.log("---> dbConsequencesData :" + JSON.stringify(dbConsequencesData));


});

module.exports = router;