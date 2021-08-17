const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
};
Student.init({
    id: {type: DataTypes.INTEGER, primaryKey: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false}
}, {
    sequelize,
    timestamps: false,
    modelName: 'Student',
    freezeTableName: true,
});

module.exports = Student;
