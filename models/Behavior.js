
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Behavior extends Model {
}

Behavior.init({
    behavior_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    behavior_name: {type: DataTypes.STRING}
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Behavior",
});
module.exports = Behavior;