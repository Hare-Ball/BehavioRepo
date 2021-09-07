const sequelize = require('../config/connection');
const {DataTypes} = require('sequelize');
const Teacher = require('./Teacher');
const Student = require('./Student');
const Classroom = require('./Classroom');
const Behavior = require('./Behavior');
sequelize.options.logging = false;





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


const StudentBehavior = sequelize.define('StudentBehavior', {
    counter: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    student_id: {type: DataTypes.INTEGER, primaryKey: true,}, //references: {model: 'Student', key: 'student_id', }},
    behavior_id: {type: DataTypes.INTEGER, primaryKey: false,}, //references: {model: 'Behavior', key: 'behavior_id',
        // primaryKey: false}},
    behavior_date: {type: DataTypes.DATE},
    behavior_note: {type: DataTypes.STRING},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "StudentBehavior",
});

Student.belongsToMany(Behavior, {
        foreignKey: 'student_id',
        through: {
            model: "StudentBehavior",
            unique: false,
        },
    },
)

Behavior.belongsToMany(Student, {
        foreignKey: 'behavior_id',
        through: {
            model: "StudentBehavior",
            unique: false,
        },
    },
);


const Action = sequelize.define('Action', {
    action_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    action_name: {type: DataTypes.STRING},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Action",
});

const Consequence = sequelize.define('Consequence', {
    counter: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: false},
    action_date: {type: DataTypes.DATE},
    action_name: {type: DataTypes.STRING},
    action_note: {type: DataTypes.STRING},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Consequence",
});

module.exports = {Action, Student, Teacher, Behavior, Classroom, StudentBehavior, Consequence};