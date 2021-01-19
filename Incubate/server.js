const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database')
const database = require('./routes/database')
require('dotenv').config();

db.authenticate()
    .then(() => { 
        console.log('Connection has been established successfully.'); 
        const app = express();
        const port = process.env.PORT || 5000;

        app.use(express.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        
        app.use('/api', database)

        app.listen(port, () => {
            console.log('Server is running on port: ' + port );
        })
    })
    .catch(err => { console.error('Unable to connect to the database:', err); });