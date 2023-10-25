/* 22.10.

    TOUR ROUTER

    A sub-application for the global app file 'app.js'

*/

// Requiring Core Modules
const express = require('express');

// Requiring the Tour Controller (Local Module)
const tourController = require('./../controllers/tourController');

// IMPLEMENTING TOURS ROUTES
// Creating Tour Router
const router = express.Router();

// Using the 'Param' Middleware to Check/Validate the Tour ID
// router.param('id', tourController.checkID);


// Implementing the Router
router
   .route('/')
   .get(tourController.getAllTours)
   .post(tourController.checkBody, tourController.createTour);

router
   .route('/:id')
   .get(tourController.getTour)
   .patch(tourController.updateTour)
   .delete(tourController.deleteTour);

// Exporting the tour router
module.exports = router;