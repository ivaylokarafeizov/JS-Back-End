const router = require('express').Router();

const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../config/config');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);

        res.cookie(TOKEN_KEY, token);

        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({
            username,
            email,
            password,
            repeatPassword,
        });

        res.cookie(TOKEN_KEY, token);

        res.redirect('/');
    } catch (error) {
        res.render('auth/register', {
            error: getErrorMessage(error),
            username,
            email,
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');

    res.redirect('/');
});

module.exports = router;
