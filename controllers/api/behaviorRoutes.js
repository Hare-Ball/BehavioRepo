const router = require('express').Router();
const {Behavior} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBehavior = await Behavior.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBehavior);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const behaviorData = await Behavior.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!behaviorData) {
      res.status(404).json({ message: 'No behavior found with this id!' });
      return;
    }

    res.status(200).json(behaviorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;