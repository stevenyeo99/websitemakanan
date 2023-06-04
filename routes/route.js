const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const db = require('../util/knex');

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

router.get("/login", (req, res) => {
    if (req.session && req.session.authenticated) {
        res.redirect('menu');
    } else {
        res.render('login', {error: ''});
    }
});

router.post("/login", (req, res) => {

    const {email, password, remember} = req.body;

    db('users').select('email', 'password').where('email', '=', email)
        .then(users => {
            if (users.length > 0) {
                const user = users[0];

                if(bcrypt.compareSync(password, user.password)) {
                    req.session.authenticated = true;
                    req.session.username = user.username;

                    if (remember) {
                        // Set a long-lived session cookie
                        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
                    }

                    return res.redirect("/menu");
                } else {
                    return res.render('login', {
                        error: 'Invalid Email/Password'
                    });
                }
            }
        })
        .catch(errors => {
            return res.render('login', {
                error: 'System unavailable please retry later.'
            });
        });        
});

router.get('/reservasi', (req, res) => {
    res.render('reservasi');
});

router.get('/reservasiAdmin', (req, res) => {
    db('reservation').select('table_no', 'is_reservated', 'reset_hours', 'reserved_datetime').orderBy('table_no', 'asc')
        .then(tables => {
            res.render('reservasiAdmin', {tables: tables});
        })
        .catch(errors => {
            return res.render('reservasiAdmin', {
                error: 'System unavailable please retry later.'
            });
        });
});

router.get('/panduan', (req, res) => {
    res.render('panduan');
});

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/resetMeja', (req, res) => {

    const {tableNo} = req.body;

    db('reservation')
        .where('table_no', '=', tableNo)
        .update({is_reservated: 'NO', reserved_datetime: null})
        .then(result => {
            return res.status(200).json({message: 'Update Reservasi Success'});
        }).catch(error => {
            return res.status(400).json({error: 'Unable to update record.'});
        });
});

router.post('/reservasiMeja', (req, res) => {

    const {tableNo} = req.body;
    
    db('reservation')
        .where('table_no', '=', tableNo)
        .update({is_reservated: 'YES', reserved_datetime: db.raw('CURRENT_TIMESTAMP')})
        .then(result => {
            return res.status(200).json({message: 'Update Reservasi Success'});
        }).catch(error => {
            return res.status(400).json({error: 'Unable to update record.'});
        });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;