require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index')
const PORT = process.env.PORT || 4000; 
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        })
        .then(val => {
            console.log("connected to db " + val)
        }, reason => {
            console.log("rejected")
        })
        .catch(reason => {
            console.log(reason)
        })
        app.listen(PORT, () => {
            console.log(`server listening on ${PORT}`); 
        });






    } catch (e) {
        console.log(e);
    }
}

start();

