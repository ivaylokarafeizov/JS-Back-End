const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
    const animals = await animalManager.getAll().lean();

    res.render('animals', { animals });
});

router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = { ...req.body, owner: req.user._id };

    try {
        await animalManager.create(animalData);

        res.redirect('/animals');
    } catch (error) {
        res.render('animals/create', { error: getErrorMessage(error) });
    }
});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).lean();
    const isOwner = req.user?._id == animal.owner._id;

    res.render('animals/details', { animal, isOwner });
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    const animalId = req.params.animalId;

    try {
        await animalManager.delete(animalId);

        res.redirect('/animals');
    } catch (error) {
        res.render(`animals/${photoId}/details`, {
            error: 'Unsuccessful photo deletion',
        });
    }
});

router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animal = await animalManager.getOne(req.params.animalId).lean();

    res.render(`animals/edit`, { animal });
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    try {
        await animalManager.edit(animalId, animalData);

        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render(`animals/edit`, {
            error: 'Unsuccessful photo edit',
            ...animalData,
        });
    }
});

router.post('/:animalId/donations', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).lean();
    const user = req.user._id;
    const isDonated = req.user?._id == animal.donations.user?._id;

    try {
        await animalManager.donate(animalId, { user, isDonated });

        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        res.render(`animals/details`, {
            error: 'Unsuccessful donation',
        });
    }
});

module.exports = router;
