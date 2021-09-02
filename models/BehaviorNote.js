const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BehaviorNote extends Model {
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

BehaviorNote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        behavior_note: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        
        date_created: {
            type: DataTypes.DATE, 
            allowNull: true, 
            defaultValue: DataTypes.NOW
        },
        behavior_id: {
            type: DataTypes.INTEGER, 
            refernces: {
                model:'behavior', 
                key: 'id'
            },
            allowNull: true
        },

        },
        {    
            sequelize,
            modelName: 'behaviornote',
            timestamps: false,
            freezeTableName: true,
            underscored: true,
        }
);

module.exports = BehaviorNote;