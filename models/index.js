const Student = require('./Student');
const Teacher = require('./Teacher');
const Behavior = require('./Behavior');

Teacher.hasMany(Student,{
    foreignKey:'teacher_id'
})

Student.hasMany(Behavior,{
    foreignKey:'student_id'
})

// Behavior.belongsToMany(Student,{
//     foreignKey:'studentBehavior_id'
// })



// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = {Student, Teacher, Behavior};