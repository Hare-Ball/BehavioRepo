const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StudentBehavior extends Model {
}

StudentBehavior.init({
    student_id:     {type: DataTypes.INTEGER, references: {model: 'Student',     key: 'student_id',     primaryKey: true}},
    behavior_id: {type: DataTypes.INTEGER, references: {model: 'Behavior', key: 'behavior_id', primaryKey: true}},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'StudentBehavior',
});
module.exports = StudentBehavior;