/* 22.10.

TOUR ROUTE CONTROLLER/HANDLER


Validating the Tour ID (Old Code; Replaced with middleware 'checkID')
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
         });
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

// Requiring Core Modules
const Tour = require('./../models/tourModel');

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

// ROUTE HANDLER FUNCTIONS for TOUR
// Handler Funtion to get all tours
exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: 'success',
      requestedAt: req.requestedAt,
      // results: tours.length,
      // data: {
      //    tours
      // }
   })
};

// Handler Function to get a specific tour
exports.getTour = (req, res) => {
   // Converting the id from string to number
   const id = req.params.id * 1;

   // // Finding the tour having same ID as 'id'
   // const tour = tours.find(el => el.id === id);    // array

   // // Sending back the response
   // res.status(200).json({
   //    status: 'success',
   //    data: {
   //       tour
   //    }
   // });
};

// Handler Function to create a new tour
exports.createTour = (req, res) => {
   // console.log(req.body);

   res.status(201).json({
      status: 'success',
      // data: {
      //    tour: newTour
      // }
   });
};

// Handler Function to update a tour
exports.updateTour = (req, res) => {
   res.status(200).json({
      status: 'success',
      data: {
         tour: '<Updata tour here...>'
      }
   })
};

// Handler Function to delete a tour
exports.deleteTour = (req, res) => {
   // 'status(204)' means 'null content'
   res.status(204).json({
      status: 'success',
      data: null
   })
};