const router = require('express').Router();
const { Teacher } = require('../../models');
console.log(__filename);

router.post('/', async (req, res) => {
  try {
    const teacherData = await Teacher.create(req.body);

    req.session.save(() => {
      req.session.user_id = teacherData.id;
      req.session.logged_in = true;

      res.status(200).json(teacherData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const username = req.body.email;
    const  usernameTrim  = username.trim();
    console.log("---> usernameTrim :>" +  (usernameTrim) +"<");

    const password = req.body.password;
    const  passwordTrim  = password.trim();
    console.log("---> passwordTrim :>" + (passwordTrim) +"<");

    const dbUserData = await User.findOne({where: {username: usernameTrim}});

    if (dbUserData !== null && (await dbUserData.checkPassword(passwordTrim))) {


      await req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;

      });
      const dbMessagesData = await Message.findAll({where: {user_id: dbUserData.id}});
      const messages = dbMessagesData.map(messages => messages.get({plain: true}));
      res.render('dashboard', {
        messages, session: req.session,
      },);
    } else {
      res.render('error');
    }

  } catch (e) {
    console.error(" ++++ " + __filename + " " + e.message);
  }
});
module.exports = router;