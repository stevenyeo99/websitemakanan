const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
const mysql = require('mysql');
const path = require('path');

app.use(express.static("./asset"));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    const filepath = path.join(__dirname, './', 'front_end/index.html');
    res.sendFile(filepath)
});

app.get("/menu", (req, res) => {
    const filepath = path.join(__dirname, './', 'front_end/menu.html');
    res.sendFile(filepath);
});

app.get("/login", (req, res) => {
    const filepath = path.join(__dirname, './', 'front_end/login.html');
    res.sendFile(filepath);
});

app.post('/reservasi', (req, res) => {

});

app.listen('3000',function(){
    console.log("the port is working right now!");
});