const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Student extends Model {
}

Student.init({
    student_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    student_name: {type: DataTypes.STRING, allowNull: false},
    student_grade: {type: DataTypes.INTEGER, allowNull: false, default:9},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Student",
});
module.exports = Student;
