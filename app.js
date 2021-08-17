const express = require('express');
const sequelize = require('./config/connection');
const peasant = require('./seed/index');
const path = require('path');
const router = require('./routes/index');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(router);

const run = async () => {

    const resultSynch = await sequelize.sync({force: false});
    const resultSow = await peasant.sow();
    const resultServerStart = await app.listen(PORT, () => {
        console.log('Sever running on port: %j', PORT);
        console.log('http://localhost:%j/', PORT);
        console.log('http://localhost:%j/api/', PORT);
        console.log('http://localhost:%j/api/Allstudents', PORT);
        console.log('http://localhost:%j/api/insertStudent', PORT);
    });


    console.log("---> resultSynch :" + resultSynch);
    console.log("---> resultSow :" + resultSow);
    console.log("---> resultServerStart :" + resultServerStart);
}

run();

