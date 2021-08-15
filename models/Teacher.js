const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Teacher extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newTeacherData) => {
        newTeacherData.password = await bcrypt.hash(newTeacherData.password, 10);
        return newTeacherData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'teacher',
  }
);

module.exports = Teacher;
