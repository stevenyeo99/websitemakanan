const cron = require('node-cron');
const db = require('./knex');

const updateTableStatus = () => {
    db('reservation').where('is_reservated', '=', 'YES')
        .select('*')
        .then(tables => {
            tables.forEach(table => {
                console.log(table);
            });
        })
        .catch(error => {
            console.log(error);
        });
};

module.exports = {
    initReservationCronJob() {
        console.log('Reservation Cron Job Initialized.');
        cron.schedule('*/5 * * * *', () => {
            updateTableStatus();
        });
    }
}