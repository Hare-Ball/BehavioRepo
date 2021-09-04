// const {Model, DataTypes} = require('sequelize');
// const sequelize = require('../config/connection');
//
// class StudentTeacher extends Model {
// }
//
// StudentTeacher.init({
//     student_id: {type: DataTypes.INTEGER, references: {model: 'Student', key: 'student_id', primaryKey: true}},
//     teacher_id: {type: DataTypes.INTEGER, references: {model: 'Teacher', key: 'teacher_id', primaryKey: true}},
// }, {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'StudentTeacher',
// });
// module.exports = StudentTeacher;