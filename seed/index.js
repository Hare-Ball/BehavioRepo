const studentData = require('./studentsData.json');
const {Student} = require('../models/index');


module.exports = peasant= {sow:async()=>{

        try {
            const  studentsCreated  = await Student.bulkCreate(studentData);
            console.log("---> studentsCreated :" + studentsCreated );
        } catch ( e ) {
            console.log("---> e :" + e );
        }
    }
}