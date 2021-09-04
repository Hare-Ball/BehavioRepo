const router = require('express').Router();
const {Behavior} = require('../../models');
// const withAuth = require('../../utils/auth');
console.log(__filename);

// get behaviors
router.get('/', (req, res) => {
  Behavior.findAll({
    attributes: ['behavior'], 
  }).then (behaviorTable => res.json(behaviorTable))
      .catch (err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// create new behavior
router.post('/', (req, res) => {
  Behavior.create({
    behavior: req.body.behavior
  }).then (behaviorTable => res.json(behaviorTable))
      .catch (err =>  {
        console.log(err);
    res.status(500).json(err);
  });
});


router.put('/:id', (res, req) => {
  Behavior.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then (behaviorTable => {
    if (!behaviorTable){
      res.status(404).json({ message: 'No behavior found with this id!'});
      return;
    }
    res.json(behaviorTable);
  }).catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  Behavior.destroy({
    where: {
      id: req.params.id
    }
  }).then(behaviorTable => {
    if (!behaviorTable) {
      res.status(404).json({ message: 'No behaviour found with this id!'});
    return;
    }
    res.json(behaviorTable);
    
  }).catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;