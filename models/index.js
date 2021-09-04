const Teacher = require('./Teacher');
const Student = require('./Student');
const Behavior = require('./Behavior');

Student.belongsToMany(Teacher, {
    foreignKey:'student_id',
    through: {
        model: "StudentTeacher",
        unique: false,
    },
});

Teacher.belongsToMany(Student, {
    foreignKey:'teacher_id',
    through: {
        model: "StudentTeacher",
        unique: false,
    },
});



Student.belongsToMany(Behavior, {
    foreignKey:'student_id',
    through: {
        model: "StudentBehavior",
        unique: false,
    },
});

Behavior.belongsToMany(Student, {
    foreignKey:'behavior_id',
    through: {
        model: "StudentBehavior",
        unique: false,
    },
});

module.exports = {Student, Teacher, Behavior};