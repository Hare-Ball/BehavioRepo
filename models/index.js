const Student = require('./Student');
const Teacher = require('./Teacher');
const Behavior = require('./Behavior');
const StudentBehavior = require('./StudentBehavior');

Teacher.hasMany(Student,{
    foreignKey:'teacher_id'
});

Behavior.hasMany(Student,{
    foreignKey:'behavior_id'
});

Behavior.belongsToMany(Student,{
    through: {
        model: BehaviorNote,
        foreignKey: 'behavior_id'
    }

});

StudentBehavior.belongsTo(Student,{
    foreignKey: 'behaviornote'

})



// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = {Student, Teacher, Behavior, BehaviorNote};