const express = require('express');
const bodyParser = require('body-parser');

const routers = require('./routes/route');
const { initReservationCronJob } = require('./util/reservationCronJob');

const app = express();

initReservationCronJob();

// middleware
app.use(express.static("./asset"));
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

// routes
app.use(routers);

app.listen('3000',function(){
    console.log("Website Makanan NodeJS App Started.");
});