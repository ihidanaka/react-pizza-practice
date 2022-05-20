const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/pizza-db', { useNewUrlParser: true } )
.then(val => {console.log("connected to db " + val)},reason => {console.log("rejected")})
.catch(reason => {console.log(reason)})

app.use(bodyParser.json());
app.use('/api',require('./api'))

app.listen(4000,()=>{
    console.log('server listening on ')
});