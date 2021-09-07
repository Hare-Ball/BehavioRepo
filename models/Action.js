
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Action extends Model {
}

Action.init({
    action_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    action_name: {type: DataTypes.STRING},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Action",
});
module.exports = Action;