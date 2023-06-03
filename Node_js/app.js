const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
const mysql = require('mysql');
const path = require('path');
const connection = mysql.createConnection({
    host:"localhost",
    user:"",
    password:"",
    database:""
})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
  });

app.use(express.static("../asset"));
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    const filepath = path.join(__dirname, '../', 'front_end/login.html');
    res.sendFile(filepath)
})

app.listen('3000',function(){
    console.log("the port is working right now!");
})