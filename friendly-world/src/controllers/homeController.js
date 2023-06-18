const router = require('express').Router();

const animalManager = require('../managers/animalManager');

router.get('/', async (req, res) => {
    const animals = await animalManager.getLastThree().lean();

    res.render('home', { animals });
});

router.get('/search', async (req, res) => {
    let location = req.query.search;
    console.log(location);
    let animals = await animalManager.searchLocation(location);

    res.render('search', { animals });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;
