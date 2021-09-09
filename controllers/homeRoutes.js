const router = require('express').Router();
const {Behavior, Student, Action, StudentBehavior, Consequence} = require('../models');
const GoogleSignIn  = require('google-sign-in');



// route to show login
router.get('/', async (req, res) => {
    res.render('login');
});

// route to show login
router.get('/login', async (req, res) => {
    res.render('login');
});


// route to show login
router.get('/Admin', async (req, res) => {

    const dbStudentDATA = await Student.findAll({include:{model:Behavior}});
    const  student  = dbStudentDATA.map(x=>x.get({plain: true}));
     console.log("---> student :" + JSON.stringify (student) );


    res.render('admin', {student, session: req.session});
});


router.get('/logout', async (req, res) => {
        try {
            req.session.destroy(async () => {

                res.render('login');
            });
        } catch (e) {

            console.error(" ++++ " + __filename + " " + e.message);
        }
    }
);


router.get('/loginGoogle', async (req, res) => {
        try {


            const config = {
                clientID:"CLIENT_ID",
                clientSecret: "CLIENT_SECRET",
                redirectURL: "REDIRECT_URL",
                defaultScope: [
                    'https://www.googleapis.com/auth/userinfo.email',
                    'https://www.googleapis.com/auth/userinfo.profile',
                ]
            }

            const googleLogin = new NodeGoogleLogin(config);

// Generate Auth URL
            const authURL = googleLogin.generateAuthUrl()
            console.log(authURL);

// Get User Profiles and Access Tokens by passing the Auth code recieved from generateAuthUrl().
// Access token & refresh token are passed along with the response object
            googleLogin.getUserProfile("AUTH_CODE").then(userProfile => {
                console.log("userProfile", userProfile);
            }).catch(error => {
                console.log(error);
            })




        } catch (e) {

            console.error(" ++++ " + __filename + " " + e.message);
        }
    }
);
module.exports = router;

























