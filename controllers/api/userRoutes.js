const router = require('express').Router();
const {Teacher, Student, Behavior, Classroom} = require('../../models');


router.post('/', async (req, res) => {
    try {
        const teacherData = await Teacher.create(req.body);

        req.session.save(() => {
            req.session.user_id = teacherData.id;
            req.session.logged_in = true;

            res.status(200).json(teacherData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/oldLogin', async (req, res) => {
    try {
        const email = req.body.email;
        const emailTrim = email.trim();
        console.log("---> usernameTrim :>" + (emailTrim) + "<");

        const password = req.body.password;
        const passwordTrim = password.trim();
        console.log("---> passwordTrim :>" + (passwordTrim) + "<");

        const dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});

        if (dbTeacherData !== null && (true)) {
//await dbTeacherData.checkPassword(passwordTrim)

            await req.session.save(() => {
                req.session.logged_in = true;
                req.session.teacherId = dbTeacherData.teacher_id;
                req.session.teacherName = dbTeacherData.teacher_name;

            });

            const dbClassroomData = await Teacher.findAll({
                where: {teacher_id: dbTeacherData.teacher_id},
                include: Student
            });
            //     where: {
            //         teacher_id: dbTeacherData.teacher_id
            //     },
            //     include: [{model: Student}]
            // });
            console.log("---> dbStudentData :" + JSON.stringify(dbClassroomData));


            const classroom = dbClassroomData.map(element => {
                return element.get({plain: true});
            });

            console.log("---> classroom :");
            console.log("---> classroom :" + JSON.stringify(classroom));
            res.render('homepage', {classroom, session: req.session});
        } else {
            res.render('error');
        }

    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

router.post('/verifyLogin', async (req, res) => {
    try {
        const email = req.body.email;
        const emailTrim = email.trim();
        const password = req.body.password;
        const passwordTrim = password.trim();

        const dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});
        console.log("---> dbTeacherData :" + JSON.stringify(dbTeacherData));

        if (dbTeacherData !== null && (true)) {


            // await req.session.save(() => {
            req.session.test = "test";
            console.log('session ', req.session)
            // });

            // await req.session.save(() => {
            req.session.logged_in = 'yes';
            req.session.teacher_id = dbTeacherData.teacher_id;
            req.session.teacher_name = dbTeacherData.teacher_name;
            req.session.email = emailTrim;

            console.log("---> req.session :" + JSON.stringify(req.session));
            //  });
            console.log("---> req.session :" + JSON.stringify(req.session));
            const dbClassroomData = await Teacher.findByPk(dbTeacherData.teacher_id, {include: Classroom});
            const classroom = dbClassroomData.get({plain: true});
            res.render('dashboard', {classroom, session: req.session});
        } else {
            res.render('error');
        }

    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

router.get('/showDashboard', async (req, res) => {
    console.log("---> showDashboard :");
    try {


        const logged_in = req.session.logged_in;
        const teacher_id = req.session.teacher_id;
        const teacher_name = req.session.teacher_name;

        const dbClassroomData = await Teacher.findByPk(teacher_id, {include: Classroom});
        const classroom = dbClassroomData.get({plain: true});
        res.render('dashboard', {classroom, session: req.session});


    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});


module.exports = router;