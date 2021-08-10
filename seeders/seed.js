//read json
const studentsData = require('./studentsData.json');
const {Student, sequelize} = require('../models/index');

//connect to database
console.log("studentsData: " + JSON.stringify(studentsData));

const seedDatabase = async () => {

// Force sync the   database
    console.log("---> database: ");
    await sequelize.sync({force: true});
    console.log("---> sequelize: ");

// create and save objects to database
    const student = await Student.bulkCreate(studentsData);
    console.log("---> student: " + JSON.stringify(student));

    // Exit the process
    process.exit(0);
}

seedDatabase();
