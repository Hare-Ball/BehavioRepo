const router = require('express').Router();
const {Behavior, Student} = require('../../models');


// get behaviors
router.get('/showDetail/:behavior_id', async (req, res) => {
    const student_id = req.sessions.student_id;
    const behavior_id = req.sessions.behavior_id;
    const dbStudentBehaviorData = await Behavior.findAll({where: {student_id, behavior_id}, include: Student});
    const studentBehavior = dbStudentBehaviorData.map(x=>{x.get({plain: true})});
    res.render('behavior-detail',{studentBehavior,session:req.session});
});
