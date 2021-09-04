//read json
const studentsData = require('./studentsData.json');
const teacherData = require('./teacherData.json');
const behaviorData = require('./behaviorData.json');

const studentbehaviorData = require('./studentbehaviorData.json');
const studentteacherData = require('./studentteacherData.json');

const sequelize = require('../config/connection');
const {Student, Teacher, Behavior, StudentTeacher, StudentBehavior} = require('../models');

//connect to database
console.log("studentsTable: " + JSON.stringify(studentsData));

const seedDatabase = async () => {

// Force sync the   database
    await sequelize.sync({force: true});

// create and save objects to database
    const  students  = await Student.bulkCreate(studentsData);
     console.log("---> students :" + JSON.stringify (students) );

    const  teacher  = await Teacher.bulkCreate(teacherData);
     console.log("---> teacher :" + JSON.stringify (teacher) );

    const  behavior  = await Behavior.bulkCreate(behaviorData);
     console.log("---> behavior :" + JSON.stringify (behavior) );

    const  studentbehavior  = await StudentBehavior.bulkCreate(studentbehaviorData);
     console.log("---> studentbehavior :" + JSON.stringify (studentbehavior) );

    const  studentteacher  = await StudentTeacher.bulkCreate(studentteacherData);
     console.log("---> studentteacher :" + JSON.stringify (studentteacher) );


    // Exit the process
    process.exit(0);
}

seedDatabase();
