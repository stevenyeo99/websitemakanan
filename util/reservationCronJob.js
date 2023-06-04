const cron = require('node-cron');
const db = require('./knex');

const updateTableStatus = () => {
    // retrieve data
    db('reservation')
        .where('is_reservated', '=', 'YES')
        .andWhere('reset_hours', '>', 0)
        .orderBy('table_no', 'asc')
        .select('*')
        .then(tables => {

            let dataToUpdate = tables.map(table => {
                const resetHours = table.reset_hours;
                const tableNo = table.table_no;

                const futureDate = new Date(table.reserved_datetime);
                futureDate.setHours(futureDate.getHours() + Number(resetHours));

                const currentTime = new Date();

                let updatedReserveDate = new Date(table.reserved_datetime);
                let isReserved = 'YES';
                // console.log('table_no', tableNo);
                // console.log('currenTime', currentTime);
                // console.log('reserve_date', updatedReserveDate);
                // console.log('futureDate', futureDate);
                // console.log('currentTime hours', currentTime.getHours());
                // console.log('futureDate hours', futureDate.getHours());
                // console.log('currentTime minutes', currentTime.getMinutes());
                // console.log('futureDate minutes', futureDate.getMinutes());
                // console.log('currentTime getUTCMonth', currentTime.getUTCMonth());
                // console.log('futureDate getUTCMonth', futureDate.getUTCMonth());
                // console.log('currentTime getUTCFullYear', currentTime.getUTCFullYear());
                // console.log('futureDate getUTCFullYear', futureDate.getUTCFullYear());
                // console.log('-------------------');

                const customCurrentDate = new Date(currentTime.getUTCFullYear(), (currentTime.getUTCMonth()), currentTime.getUTCDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
                const customFutureReverseDate = new Date(futureDate.getUTCFullYear(), (futureDate.getUTCMonth()), futureDate.getUTCDate(), futureDate.getHours(), futureDate.getMinutes(), futureDate.getSeconds());
                console.log(customCurrentDate);
                console.log(customFutureReverseDate);
                if (customCurrentDate > customFutureReverseDate) {
                    console.log('Reset Table ' + tableNo, table);
                    updatedReserveDate = null;
                    isReserved = 'NO';
                }

                return {
                    ...table,
                    is_reservated: isReserved, 
                    reserved_datetime: updatedReserveDate
                }
            });

            dataToUpdate = dataToUpdate.filter(data => {
                return data.is_reservated === 'NO';
            });

            console.log(dataToUpdate);

            // transaction to update data
            db.transaction((trx) => {
                    const updatedDataPromises = dataToUpdate.map(table => {
                        return db('reservation')
                            .transacting(trx)
                            .where('id', '=', table.id)
                            .update(table);
                    });

                    Promise.all(updatedDataPromises)
                        .then(() => {
                            console.log('Batch update successful');
                            trx.commit();
                        })
                        .catch((error) => {
                            console.error('Error performing batch update:', error);
                            trx.rollback();
                        });

                }).then(function () {
                    console.log('Transaction committed');
                })
                .catch(function (error) {
                    console.error('Error performing transaction:', error);
                });
        });    
};

module.exports = {
    initReservationCronJob() {
        console.log('Reservation Cron Job Initialized.');
        cron.schedule('* * * * *', () => {
            updateTableStatus();
        });
    }
}