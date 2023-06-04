const bcrypt = require('bcrypt-nodejs');
const db = require('../util/knex');

const getLoginPage = (req, res) => {
    const errorMessage = req.query.error;

    if (req.session && req.session.authenticated) {
        res.redirect('menu');
    } else {
        res.render('login', {
            error: (errorMessage ? errorMessage : '')
        });
    }
}

const doLogin = (req, res) => {
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
}

const doLogout = (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
}

module.exports = {
    getLoginPage,
    doLogin,
    doLogout
};