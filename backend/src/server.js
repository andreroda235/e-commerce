const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const jwt = require('jsonwebtoken');
/* const path = require('path'); */
const HttpError = require('./models/http-error');
const { jwtKey } = require('./util/encryption');

//public routes
const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/item-routes');

//token routes
const authItemsRoutes = require('./routes/item-routes-auth');
const authCartRoutes = require('./routes/cart-routes-auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PUT, PATCH, DELETE');
/*     res.setHeader('Access-Control-Allow-Credentials', 'true');
 */    
    next();
});



//public api routing

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

//token based api routing

//token validation
app.use((req, res, next) => {
    if(req.method === 'OPTIONS')
        return next();

    try {
        const authHeader = req.headers['authorization']; /* req.headers['x-access-token']; */
        if (!authHeader) 
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        const token = authHeader.split(/\b\s+/)[1];
    /* jwt.verify(token, process.env.SECRET jwtKey, (err, decoded) => {
      if (err)
        return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.body.userId = decoded.userId;
      console.log( "UID: " + req.body.userId);
      next();
    }); */

        const decodedToken = jwt.verify(token, jwtKey);
        req.body.userId = decodedToken.userId;
        /* req.userData = {userId: decodedToken.userId}; */
        next();
    } catch (error) {
        return next(new HttpError(
            'Authentication failed!',
            403
            ));
    }
});

app.use('/api/items', authItemsRoutes);
app.use('/api/cart', authCartRoutes);



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

//pass uri in argv
const uri = process.argv[2];
//paste the linnk when the server starts
mongoose.connect(uri)
        .then(() => {
            app.listen(5000);
        })
        .catch(err => {
            console.log(err);
        });