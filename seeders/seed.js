//read json
const studentsData = require('./studentsData.json');
const teacherData = require('./teacherData.json');
const behaviorData = require('./behaviorData.json');

const studentbehaviorData = require('./studentbehaviorData.json');
const studentteacherData = require('./studentteacherData.json');

const sequelize = require('../config/connection');
const {Student, Teacher, Behavior, StudentTeacher, StudentBehavior} = require('../models');

//connect to database
("studentsTable: " + JSON.stringify(studentsData));

const seedDatabase = async () => {

// Force sync the   database
    await sequelize.sync({force: true});

// create and save objects to database
    const  students  = await Student.bulkCreate(studentsData);

    const  teacher  = await Teacher.bulkCreate(teacherData);

    const  behavior  = await Behavior.bulkCreate(behaviorData);

    //const  studentbehavior  = await StudentBehavior.bulkCreate(studentbehaviorData);

    //const  studentteacher  = await StudentTeacher.bulkCreate(studentteacherData);


    // Exit the process
    process.exit(0);
}

seedDatabase();
