const Teacher = require('./Teacher');
const Student = require('./Student');
const Classroom = require('./Classroom');
const Behavior = require('./Behavior');

Student.belongsToMany(Classroom, {
        through: "StudentClassroom",
        foreignKey: 'student_id',
    },
);

Classroom.belongsToMany(Student, {
        through: "StudentClassroom",
        foreignKey: 'classroom_id',
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

Classroom.belongsToMany(Teacher, {
        through: "ClassroomTeacher",
        foreignKey: 'classroom_id',
    },
);

Teacher.belongsToMany(Classroom, {
        through: "ClassroomTeacher",
        foreignKey: 'teacher_id',
    },
);
module.exports = {Student, Teacher, Behavior, Classroom};