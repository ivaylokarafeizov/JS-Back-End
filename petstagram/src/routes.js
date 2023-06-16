const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');

router.use(homeController);
router.use('/auth', authController);
router.use('/photos', photoController);
// router.get('*', (req, res) => {
//     res.redirect('/404');
// });

module.exports = router;
