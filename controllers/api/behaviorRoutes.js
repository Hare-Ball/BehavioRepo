const router = require('express').Router();
const { Student, Behavior, User } = require('../../models');

router.get('/', async (req, res) => {
    //find all Behaviors
    try{
      const behaviorData = await Behavior.findAll({
        //include: students?
      });
      res.status(200).json(behaviorData);
    } catch (err) {
      res.status(500).json(err);
    }
    });

router.get('/:id', async (req, res) => {
    // find one behavior by its `id` value

    try {
      const behaviorData = await Behavior.findByPk(req.params.id, {
        //include: students?
      });
  
      if (!behaviorData) {
        res.status(404).json({ message: 'No Behavior found with this id!' });
        return;
      }
  
      res.status(200).json(behaviorData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new behavior
   try {
    const behaviorData = await Behavior.create(req.body);
     res.status(200).json(behaviorData);
   } catch (err) {
    res.status(400).json(err);
 }
 });

 router.put('/:id', (req, res) => {
    // update a User by its `id` value
    Behavior.update(
    //   {
    //    id:req.body.id,
    //    category_name: req.body.category_name 
    //   },
    //   {
    //     where: {
    //       id: req.params.id
    //     }
    //   }
    )
    .then((updatedBehavior) => {
      res.json(updatedBehavior);
    })
    .catch((err) => res.json(err));
  });

  router.delete('/:id', async (req, res) => {
    // delete a User by its `id` value
    try {
      const behaviorData = await Behavior.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!behaviorData) {
        res.status(404).json({ message: 'No Behavior found with this id!' });
        return;
      }
  
      res.status(200).json(behaviorData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  


