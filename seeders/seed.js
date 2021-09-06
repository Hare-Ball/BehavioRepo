//read json
const studentsData = require('./studentsData.json');
const teacherData = require('./teacherData.json');
const behaviorData = require('./behaviorData.json');
const classroomData = require('./classroomData.json');



const sequelize = require('../config/connection');
const {Student, Teacher, Behavior, Classroom} = require('../models');

//connect to database
const seedDatabase = async () => {

// Force sync the   database
    await sequelize.sync({force: true});

// create and save objects to database
    await Student.bulkCreate(studentsData);
    await Teacher.bulkCreate(teacherData);
    await Behavior.bulkCreate(behaviorData);
    await Classroom.bulkCreate(classroomData);

    let student;
    let behavior;
    let classroom;
    let teacher;

    //STUDENT BEHAVIOR
    for (let i = 1; i <= 10; i++) {

        for (let j = 1; j <= 5; j++) {

            student = await Student.findByPk(i);
            behavior = await Behavior.findByPk(j);

            let random = Math.floor(Math.random() * 10);
            console.log("---> random :" + JSON.stringify(random));
            if (random > 5) {
                student.addBehavior(behavior);
                console.log('---> added !  - random:' + random)
            }
        }
    }

    // STUDENT CLASSROOM
    for (let i = 1; i <= 10; i++) {

        for (let j = 1; j <= 6; j++) {

            student = await Student.findByPk(i);
            classroom = await Classroom.findByPk(j);
            student.addClassroom(classroom);
        }
    }

    // CLASSROOM TEACHER
    for (let i = 1; i <= 5; i++) {

        for (let j = 1; j <= 6; j++) {

            teacher = await Teacher.findByPk(i);
            classroom = await Classroom.findByPk(j);
            classroom.addTeacher(teacher);
        }
    }

    // Exit the process
    process.exit(0);
}

seedDatabase();
