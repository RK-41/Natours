/*  20.10.

    PROJECT NATOURS

    // DEFINING ROUTS
    // For 'get' method of http
    app.get('/', (req, res) => {
        // Sending some data(string) back to the client specifying the status code
        // res.status(200).send('This is from the server side!');

        // Sending a json file back to the client
        res
            .status(200)
            .json({ message: 'Hello from the server side!', app: 'Natours' });
    });

    // For 'post' method of http
    app.post('/', (req, res) => {
        res.send('You can post to this endpoint...');
    })

    // IMPLEMENTING TOURS ROUTS
    // Method 1: app.httpMethod(route, route-handler)
    // Implementing Route Handler for 'get' all tours Request
    app.get('/api/v1/tours', getAllTours);

    // Implementing Route Handler for 'post' request for a specific 'tour'
    app.get('/api/v1/tours/:id', getTour);

    // Implementing Route Handler for 'post' Request to create a tour
    app.post('/api/v1/tours', createTour);

    // Handling 'patch' (Update) request
    app.patch('/api/v1/tours/:id', updateTour);

    // Handling 'delete' request
    app.delete('/api/v1/tours/:id', deleteTour);

*/

// REQUIRING MODULES
const fs = require('fs');
const express = require('express');

// 22.10.23 Third-party Middleware
// Logging Middleware 'morgan' to see the request in the console
const morgan = require('morgan');

// Requiring the Tour Router and User Router
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Creating a variable 'app' and adding a bunch of methods to it
const app = express();

// Middleware to modify incoming request data - Stands b/w req & res
app.use(express.json());

// Using 'morgan()' middleware to log request to the console only when the app is in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Serving Static Files using a Middleware
app.use(express.static(`${__dirname}/public`));

// 22.10.23 Custom Middleware
app.use((req, res, next) => {
    console.log('This is a middleware.');
    next();
});

app.use((req, res, next) => {
    // Adding a property named 'requestedAt' to the 'req' object
    req.requestedAt = new Date().toISOString();
    next();
});

// Mounting the Routers - Using Routers as Middlewares
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
