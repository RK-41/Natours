/* 22.10.

   TOUR ROUTE CONTROLLER/HANDLER

   26.10.
      Modified the function 'getAllTours()'
         BUILDING THE QUERY
         EXECUTING THE QUERY
*/

// Requiring Core Modules
const Tour = require('./../models/tourModel');

// ROUTE HANDLER FUNCTIONS for TOUR
// Handler Funtion to get all tours
exports.getAllTours = async (req, res) => {

   try {
      // BUILDING THE QUERY
      // Creating a query object
      const queryObj = { ...req.query };

      // Array of excluded fields
      const excludedFields = ['page', 'sort', 'limit', 'fields'];

      // Deleting excluded fields form the query object
      excludedFields.forEach(el => {
         return delete queryObj[el];
      });

      console.log(req.query, queryObj);

      // Getting the query
      const query = Tour.find(queryObj);

      // const query = Tour.find()
      //    .where('duration').equals(5)
      //    .where('difficulty').equals('easy');

      // EXECUTING THE QUERY
      // Getting the Filtered Documents based on the 'query'
      const tours = await query;

      // SENDING THE RESPONSE
      res.status(200).json({
         status: 'success',
         results: tours.length,
         data: {
            tours
         }
      });
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }

};

// Handler Function to get a specific tour
exports.getTour = async (req, res) => {
   try {
      // Getting a specific tour by using the 'id' parameter/variable
      const tour = await Tour.findById(req.params.id);

      // Sending back response
      res.status(200).json({
         status: 'success',
         data: {
            tour
         }
      })
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      })
   }

   // // Finding the tour having same ID as 'id'
   // const tour = tours.find(el => el.id === id);    // array
};

// Handler Function to create a new tour
exports.createTour = async (req, res) => {
   // console.log(req.body);

   // 25.10.23 Handling Error using try-catch
   try {
      // Creating a new Tour by directly calling the 'create()' on the 'Tour'
      const newTour = await Tour.create(req.body);
      // 'Tour.create()' will return a promise which will return a result which will be stored in 'newTour' which will be the newly created document

      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour
         }
      });

   } catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err
      })
   }
};

// Handler Function to update a tour
exports.updateTour = async (req, res) => {
   try {
      // Updating the tour
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true
      });
      // 'req.body' has the data to be updated
      // Third parameter is an option with 'new' set to 'true' to return the updated document instead of the original one

      res.status(200).json({
         status: 'success',
         data: {
            tour
         }
      });
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }
};

// Handler Function to delete a tour
exports.deleteTour = async (req, res) => {
   try {
      await Tour.findByIdAndDelete(req.params.id);

      res.status(204).json({
         status: 'success',
         data: null
      })
   } catch (err) {
      res.status(404).json({
         status: 'fail',
         message: err
      })
   }
};

/*
   OLD CODES
 
   // Validating the Tour ID (Old Code; Replaced with middleware 'checkID')
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
         });
      }
      
   // Exporting the 'checkBody' Function/Middleware for missing 'name' or 'price'
      exports.checkBody = (req, res, next) => {
         const reqBody = req.body;
      
         if (!reqBody.name || !reqBody.price) {
            return res.status(400).json({
               status: 'fail',
               message: 'Missing name or price'
            })
         }
      
         next();
      }
 
 
   // Exporting the 'checkID' Function/Middleware (Old Code < 24.10.)
    exports.checkID = (req, res, next, val) => {
       Handling the case when requested tour doesn't exist
       if (req.params.id * 1 >= tours.length) {
          console.log('Invalid ID!');
    
          return res.status(404).json({
             status: 'fail',
             message: 'Invalid ID'
          });
         }
         
         console.log(`Tour ID is ${val}.`);
         next();
      }
      
   // Reading Tours Data (Old Code for Testing)
      const tours = JSON.parse(
         fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
         );
         
 
    // Handler Function to Create a New Tour (Old code < 24.10.)
    exports.createTour = (req, res) => {
    // Creating a new id of the new tour by using last tour's id
    const newId = tours[tours.length - 1].id + 1;
    
    // Creating new tour object and merging the existing tour object to it
    const newTour = Object.assign({ id: newId }, req.body);
    
    // Pushing new tour 'newTour' into the 'tour' array
    tours.push(newTour);
    
    // Persisting the 'tours' object/data
    fs.writeFile(
       `${__dirname}/dev-data/data/tours-simple.json`,
       JSON.stringify(tours),
       err => {
          res.status(201).json({
             status: 'success',
             data: {
                tour: newTour
             }
          });
       }
    );
   };
*/