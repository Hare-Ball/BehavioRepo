const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Classroom extends Model {
}

Classroom.init({
    classroom_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    classroom_name: {type: DataTypes.STRING, allowNull: false},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Classroom",
});
module.exports = Classroom;
