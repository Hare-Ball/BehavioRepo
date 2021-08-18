const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Studentx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
};
Studentx.init({
    student_id: {type: DataTypes.INTEGER, primaryKey: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false}
}, {
    sequelize,
    timestamps: false,
    modelName: 'Studentx',
    freezeTableName: true,
    underscored: true,
});

module.exports = Studentx;
