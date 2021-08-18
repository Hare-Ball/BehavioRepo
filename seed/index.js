const studentData = require('./studentsData.json');
const {Studentx} = require('../models/index');


module.exports = peasant= {sow:async()=>{

        try {
            const  StudentxsCreated  = await Studentx.bulkCreate(studentData);
            console.log("---> StudentxsCreated :" + StudentxsCreated );
        } catch ( e ) {
            console.log("---> e :" + e + ". " + __filename);
        }
    }
}