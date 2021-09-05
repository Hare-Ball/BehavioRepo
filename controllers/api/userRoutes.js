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

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const emailTrim = email.trim();
        console.log("---> usernameTrim :>" + (emailTrim) + "<");

        const password = req.body.password;
        const passwordTrim = password.trim();
        console.log("---> passwordTrim :>" + (passwordTrim) + "<");

        const dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});

        if (dbTeacherData !== null && (true)) {

            await req.session.save(() => {
                req.session.logged_in  = true;
                 console.log("---> req.session.logged_in :" + (req.session.logged_in) );
                req.session.teacherId  = dbTeacherData.teacher_id;
                 console.log("---> req.session.teacherId  :" +  (req.session.teacherId ) );
                req.session.teacherName  = dbTeacherData.teacher_name;
                 console.log("---> req.session.teacherName :" + (req.session.teacherName) );

            });

            const  dbClassroomData  = await Teacher.findByPk(dbTeacherData.teacher_id,{include:Classroom});
             console.log("---> dbClassroomData :" + JSON.stringify (dbClassroomData) );
            //     where: {
            //         teacher_id: dbTeacherData.teacher_id
            //     },
            //     include: [{model: Student}]
            // });
            console.log("---> dbClassroomData :" + JSON.stringify(dbClassroomData));


            const classroom = dbClassroomData.get({plain: true});


            console.log("---> classroom :");
            console.log("---> classroom :" + JSON.stringify(classroom));
            res.render('classroom-list', {classroom, session: req.session});
        } else {
            res.render('error');
        }

    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

router.get('/logout', async (req, res) => {
        try {
            req.session.destroy(async () => {
                console.log("---> destroy :");

                res.render('login', {session: req.session,});
            });
        } catch (e) {

            console.error(" ++++ " + __filename + " " + e.message);
        }
    }
);

module.exports = router;