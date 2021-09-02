const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,  
            autoIncrement: true
        },

        student_name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        
        student_grade: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        
        teacher_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'teacher', 
                key: 'id'
            }, 
            allowNull: true
        },


        
            behaviornote_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'behaviornote',
                key: 'id'
            },
            allowNull: false
        },
    },
    {    
        sequelize,
        modelName: 'student',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Student;
