const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
/* const path = require('path'); */

const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    
    next();
});

// /api/users => route filter
app.use('/api/users', usersRoutes);

//Is only reached if all other endpoints don't get a response
app.use((req, res, next) => {
    throw new HttpError('Oops! Could not find this page.', 404);
});

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if(res.headerSent)
        return next(error);

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

//paste the linnk when the server starts
mongoose.connect('mongodb+srv://andreroda235:3yKdive4ymfcH3iJ@simple-app-cluster.0qbj7eb.mongodb.net/mern?retryWrites=true&w=majority')
        .then(() => {
            app.listen(5000);
        })
        .catch(err => {
            console.log(err);
        });