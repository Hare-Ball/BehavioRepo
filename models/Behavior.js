
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Behavior extends Model {
}

Behavior.init({
    tag_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    tag_name: {type: DataTypes.STRING}
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Tag",
});
module.exports = Behavior;