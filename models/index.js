const Teacher = require('./Teacher');
const Student = require('./Student');
const StudentBehavior = require('./StudentBehavior');
const StudentTeacher = require('./StudentTeacher');
const Behavior = require('./Behavior');

Student.belongsToMany(Teacher, {
        through: "StudentTeacher",
        foreignKey: 'student_id',
    },
);

Teacher.belongsToMany(Student, {
        through: "StudentTeacher",
        foreignKey: 'teacher_id',
    },
);

Student.belongsToMany(Behavior, {
        through: "StudentBehavior",
        foreignKey: 'student_id',
    },
)

Behavior.belongsToMany(Student, {
        through: "StudentBehavior",
        foreignKey: 'behavior_id',
    },
);

module.exports = {Student, Teacher, Behavior, StudentBehavior, StudentTeacher};