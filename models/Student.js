const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {}

Student.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        firstName: {type: DataTypes.STRING, allowNull: false},
        lastName: {type: DataTypes.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'Student',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Student;
