const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Teacher extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Teacher.init({
        teacher_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        teacher_name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        admin: {type: DataTypes.BOOLEAN, allowNull: false},
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        modelName: 'Teacher',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
    });
module.exports = Teacher;

