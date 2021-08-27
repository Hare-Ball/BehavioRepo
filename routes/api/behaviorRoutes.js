const router = require('express').Router();
// use object destructuring to import our two models by name
const { Behavior } = require('../../models');

// GET all students
router.get('/', async (req, res) => {

});

// GET a single student
router.get('/:id', async (req, res) => {

});

// CREATE a student
router.post('/', async (req, res) => {

});

// DELETE a student
router.delete('/:id', async (req, res) => {

});

module.exports = router;