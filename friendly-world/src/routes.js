const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const animalController = require('./controllers/animalController');

router.use(homeController);
router.use('/auth', authController);
router.use('/animals', animalController);
// router.get('*', (req, res) => {
//     res.redirect('/404');
// });

module.exports = router;
