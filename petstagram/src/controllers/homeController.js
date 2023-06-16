const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {
    const photos = await photoManager.getByOwner(req.user._id);

    res.render('profile', { photos, photoCount: photos.length });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;
