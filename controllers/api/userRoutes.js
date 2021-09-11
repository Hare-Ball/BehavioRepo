const router = require('express').Router();
const password = require('../../utils/password')
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
        console.log("---> passwordTrim :" + JSON.stringify(passwordTrim));

        const dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});
        console.log("---> dbTeacherData :" + JSON.stringify(dbTeacherData));


        const validPassword = await dbTeacherData.checkPassword(req.body.password);
        console.log("---> validPassword :" + JSON.stringify(validPassword));


        if (dbTeacherData !== null && (validPassword)) {
            console.log(" ---------------  GOT IN  -------------------------")
            console.log("---> dbTeacherData.password :" + JSON.stringify(dbTeacherData.password));

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


        const teacher_id = req.session.teacher_id;
        const teacher_name = req.session.teacher_name;

        const dbClassroomData = await Teacher.findByPk(teacher_id, {include: Classroom});
        const classroom = dbClassroomData.get({plain: true});
        res.render('dashboard', {classroom, session: req.session});


    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

router.get('/verifyLoginGoogle/:param', async (req, res) => {
    console.log("---> verifyLoginGoogle :");
    try {

        const param = req.params.param.toString().split("|");
        const tname = param[0];
        const email = param[1];
        const emailTrim = email.trim();
        let dbTeacherData;

        dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});
        if (dbTeacherData === null) {
            const teacherPassword = password.create();

            console.log("---> teacherPassword :" + JSON.stringify(teacherPassword));

            const newTeacher = await Teacher.create({teacher_name: tname, email: email, password: teacherPassword});
            console.log("---> newTeacher :" + JSON.stringify(newTeacher));
        }


        dbTeacherData = await Teacher.findOne({where: {email: emailTrim}});
        const passwrd = dbTeacherData.password;
        console.log("---> found dbTeacherData.password :" + JSON.stringify(passwrd));
        if (dbTeacherData !== null && (true)) {

            req.session.teacher_id = dbTeacherData.teacher_id;
            req.session.teacher_name = dbTeacherData.teacher_name;
            req.session.email = emailTrim;
            req.session.google = 'Y';

            console.log("---> req.session :" + JSON.stringify(req.session));
            const dbClassroomData = await Teacher.findByPk(dbTeacherData.teacher_id, {include: Classroom});
            const classroom = dbClassroomData.get({plain: true});
            res.render('dashboard', {classroom, session: req.session});
        } else {


        }

    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

router.post('/newUser', async (req, res) => {
    console.log("---> newUser :");
    try {

        console.log("---> req.body.params :" + JSON.stringify(req.body));
        let {teacher_name, email, password} = req.body;

        const newTeacher = await Teacher.create({teacher_name, email, password});
        console.log("---> newTeacher :" + JSON.stringify(newTeacher));


        const teacher_id = req.session.teacher_id;
        teacher_name = req.session.teacher_name;

        const dbClassroomData = await Teacher.findByPk(teacher_id, {include: Classroom});
        const classroom = dbClassroomData.get({plain: true});
        res.render('dashboard', {classroom, session: req.session});


    } catch (e) {
        console.error(" ++++ " + __filename + " " + e.message);
    }
});

module.exports = router;