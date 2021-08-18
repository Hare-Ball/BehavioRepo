const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {}

Student.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement: true,},
        firstName: {type: DataTypes.STRING, allowNull: false,},
        lastName: {type: DataTypes.STRING, allowNull: false,},
        studentGrade: {type: DataTypes.INTEGER, allowNull: false,},
        behaviorNote: {type: DataTypes.STRING,},
        date_created: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW,},
        teacher_id:{type: DataTypes.INTEGER, references: {model: 'teacher', key: 'id',}},
        studentBehavior_id:{type: DataTypes.INTEGER, refernces: {model:'behavior', key: 'id',},},
    },{    
        sequelize,
        modelName: 'student',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Student;
