/* 22.10.

    USER ROUTER

    A sub-application for the global app file 'app.js'
*/

// Requiring Core Modules
const express = require('express');

// Requiring User Route Controller (Local Module)
const userController = require('./../controllers/userController');

// IMPLEMENTING USERS ROUTES
// Creating User Router
const router = express.Router();
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

// Exporting the User Router
module.exports = router;