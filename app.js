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
    console.log("---> JAWSDB_URL :" + process.env.JAWSDx_URL);
    const resultSynch = await sequelize.sync({force: true});
    const resultSow = await peasant.sow();
    const resultServerStart = await app.listen(PORT, () => {
        console.log('http://localhost:%j/api/Allstudents', PORT);
    });

    console.log('')
        console.log('Sever running on port: %j', PORT);
    console.log('')
    console.log('Database Seeded.')
    console.log('')

    console.log("---> resultSynch :" + resultSynch);
    console.log("---> resultSow :" + resultSow);
    console.log("---> resultServerStart :" + resultServerStart);
}

run();

