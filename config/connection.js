const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

     //("---> process.env.JAWSDB_URL :" + process.env.JAWSDB_URL );
// if( process.env.JAWSDB_URL ) {
//    sequelize = new
//    Sequelize("mysql://ugin4yv4xavz56ac:hz3jnkazmgolad7z@vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/jhjr0anlumd45h6u");
// }
// else{
    sequelize = new Sequelize(
        "student_behavior_db",
        "root",
        "",
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            logging: false,
            timestamps: false,
            force: false,
        }
    );
// }

module.exports = sequelize


// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize;

// // if(process.env.JAWSDB_URL) {
// //     sequelize = new Sequelize(process.env.JAWSDB_URL);
// // }else{
//     sequelize = new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//         {
//             host: 'vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//             dialect: 'mysql',
//             port: 3306,
//         }
//     );
// // }

// module.exports = sequelize
