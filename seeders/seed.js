//read json
const studentsData = require('./studentsData.json');
const teacherData = require('./teacherData.json')
const behaviorData = require('./behaviorData.json')
const sequelize = require('../config/connection');
const {Student, Teacher, Behavior} = require('../models');

//connect to database
console.log("studentsTable: " + JSON.stringify(studentsData));

const seedDatabase = async () => {

// Force sync the   database
    console.log("---> database: ");
    await sequelize.sync({force: true});
    console.log("---> sequelize: ");

// create and save objects to database
    const teacher = await Teacher.bulkCreate(teacherTable);
    console.log("---> teacher: " + JSON.stringify(teacher));

    const student = await Student.bulkCreate(studentsTable);
    console.log("---> student: " + JSON.stringify(student));

    const behavior = await Behavior.bulkCreate(behaviorTable);
    console.log("---> behavior: " + JSON.stringify(behavior));


    // Exit the process
    process.exit(0);
}

seedDatabase();
