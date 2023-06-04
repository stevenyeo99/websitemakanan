const connection = require('./util/knex');

connection.raw('SELECT 1+1 AS result')
    .then(() => {
        console.log('Connection successful!');
        connection.destroy(); // Close the connection
    })
    .catch((error) => {
        console.error('Connection failed:', error);
        connection.destroy(); // Close the connection
    });