const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database')
const urls = require('./routes/methods')
const io = require('socket.io')();
require('dotenv').config();

db.authenticate()
    .then(() => { 
        console.log('Connection has been established successfully.'); 
        const app = express();
        const port = process.env.PORT || 5000;

        app.use(express.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        
        app.use('/api', urls)

        app.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            // Pass to next layer of middleware
            next();
        });

        app.listen(port, () => {
            console.log('Server is running on port: ' + port );
        })
    })
    .catch(err => { console.error('Unable to connect to the database:', err); });