const router = require('express').Router();


// route to show login
router.get('/', async (req, res) => {
    res.render('login');
});

// route to show login
router.get('/login', async (req, res) => {
    res.render('login');
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

module.exports = router;

