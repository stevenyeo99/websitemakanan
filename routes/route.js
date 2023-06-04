const express = require('express');
const session = require('express-session');

const { getLoginPage, doLogin, doLogout } = require('../controllers/user-controller');
const {
    getReservasiUserPage,
    getReservasiAdminPage,
    getPanduanPage,
    getTransferPage,
    doResetMeja,
    doReservasiMeja
} = require('../controllers/reservation-controller');

const router = express.Router();

router.use(session({
    secret: 'Test123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    rolling: true
}));

router.get("/", function (req, res) {
    res.render('index');
});

router.get("/menu", (req, res) => {
    res.render('menu', {authenticated: req.session.authenticated});
});

// user resources
router.get("/login", getLoginPage);
router.post("/login", doLogin);

// reservation resources
router.get('/reservasi', getReservasiUserPage);
router.get('/reservasiAdmin', getReservasiAdminPage);
router.get('/panduan', getPanduanPage);
router.get('/transfer', getTransferPage);
router.post('/resetMeja', doResetMeja);
router.post('/reservasiMeja', doReservasiMeja);
router.get('/logout', doLogout);

module.exports = router;