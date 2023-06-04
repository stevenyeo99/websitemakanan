const bcrypt = require('bcrypt-nodejs');
const db = require('../util/knex');

const getReservasiUserPage = (req, res) => {

    console.log(new Date().getHours());
    console.log(new Date().toLocaleTimeString());

    return db('reservation').select('table_no', 'is_reservated', 'reset_hours', 'reserved_datetime').orderBy('table_no', 'asc')
        .then(tables => {
            res.render('reservasi', {
                tables: tables
            });
        })
        .catch(errors => {
            return res.render('reservasi', {
                error: 'Sistem sedang gangguan, boleh dicoba lagi nanti.'
            });
        });
}

const getReservasiAdminPage = (req, res) => {
    if (req.session && req.session.authenticated) {
        return db('reservation').select('table_no', 'is_reservated', 'reset_hours', 'reserved_datetime').orderBy('table_no', 'asc')
            .then(tables => {
                res.render('reservasiAdmin', {
                    tables: tables
                });
            })
            .catch(errors => {
                return res.render('reservasiAdmin', {
                    error: 'Sistem sedang gangguan, boleh dicoba lagi nanti.'
                });
            });
    } else {
        const errorMessage = 'Please Login First.';
        res.redirect('login?error=' + encodeURIComponent(errorMessage));
    }
}

const getPanduanPage = (req, res) => {
    return res.render('panduan');
}

const getTransferPage = (req, res) => {
    return res.render('transfer');
}

const doResetMeja = (req, res) => {
    const {tableNo} = req.body;

    db('reservation')
        .where('table_no', '=', tableNo)
        .update({is_reservated: 'NO', reserved_datetime: null})
        .then(result => {
            return res.status(200).json({message: 'Update Reservasi Success'});
        }).catch(error => {
            return res.status(400).json({error: 'Unable to update record.'});
        });
};

const doReservasiMeja = (req, res) => {
    const {tableNo} = req.body;
    
    db('reservation')
        .where('table_no', '=', tableNo)
        .update({is_reservated: 'YES', reserved_datetime: db.raw('CURRENT_TIMESTAMP')})
        .then(result => {
            return res.status(200).json({message: 'Update Reservasi Success'});
        }).catch(error => {
            return res.status(400).json({error: 'Unable to update record.'});
        });
}

module.exports = {
    getReservasiUserPage,
    getReservasiAdminPage,
    getPanduanPage,
    getTransferPage,
    doResetMeja,
    doReservasiMeja
}