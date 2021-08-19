const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001
;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
    console.log('HOME ROUTES:');
    console.log(' ');
    console.log("http://localhost:%j/", PORT);
    console.log("http://localhost:%j/teacher/:id", PORT);
    console.log("http://localhost:%j/student/:id", PORT);
    console.log("http://localhost:%j/profile", PORT);
    console.log("http://localhost:%j/login", PORT);
    console.log('');
    console.log('');
    console.log('API ROUTES:');
    console.log(' ');
    console.log("http://localhost:%j/api/users/", PORT);
    console.log("http://localhost:%j/api/users/login", PORT);
    console.log("http://localhost:%j/api/users/logout", PORT);
    console.log("http://localhost:%j/api/projects", PORT);
    console.log("http://localhost:%j/api/students/", PORT);
    console.log("http://localhost:%j/api/students/:id", PORT);
    console.log("http://localhost:%j/api/students/:id", PORT);
    
});
