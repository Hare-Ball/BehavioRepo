const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

sequelize = new Sequelize("mysql://ugin4yv4xavz56ac:hz3jnkazmgolad7z@vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/jhjr0anlumd45h6u");


// sequelize = new Sequelize(
//     'student_behavior_db',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306,
//     },
//     {
//         timestamps: false,
//         // logging: (...msg) => console.log(msg),
//         logging:false,
//     },
// );

module.exports = sequelize
