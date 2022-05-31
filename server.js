const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



app.use(cors());
app.use(bodyParser.json());


app.listen(4000, () => {
    console.log('server listening on')
});
mongoose.connect('mongodb://ihidanaka:ihidanaka@5.187.0.127:27017/pizza-db', { useNewUrlParser: true })
    .then(val => { console.log("connected to db " + val) }, reason => { console.log("rejected") })
    .catch(reason => { console.log(reason) })
app.use('/api', require('./api/api'))