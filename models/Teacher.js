const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Teacher extends Model {
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}
class Product extends Model {}

Teacher.init({
    teacher_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    teacher_name: {type: DataTypes.STRING, allowNull: false},
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Teacher",
});
module.exports =  Teacher;

