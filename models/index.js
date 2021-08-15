const Student = require('./Student');
const Teacher = require('./Teacher');
const Behavior = require('./Behavior');


// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = {Student, Teacher, Behavior};