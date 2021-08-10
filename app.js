const express = require('express');
const {sequelize, Student} = require('./models/index');
const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());

app.post('/student', async (req, res) => {
    try {
        const {id, firstName, lastName} = req.body;
        const student = await Student.create({id, firstName, lastName});
        console.log("student: " + JSON.stringify(student));

        res.status(202).json(student);

    } catch (err) {
        res.status(500).send(">>>>>" + err.message);
    }
});

app.get('/allStudents', (req, res) => {
    try {
        const students = Student.findAll();
        return res.status(200).json(students);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

app.listen({port: 3000}, async () => {

    //lets check the connection with MySQL
    // await sequelize.authenticate();
    console.log('authenticated to MySQL');

    await sequelize.sync({force: true});
    console.log('Database sync complete');
});



