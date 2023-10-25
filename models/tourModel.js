/* 24.10.23

   TOUR MODEL
   Stand-alone file for the 'Tour' Model


   // 1. Create a Schema
   // 2. Create a Model

   // 3. Create a Document (Testing Codes)
   const testTour = new Tour({
   name: 'The Paraglider',
   rating: 4.9,
   price: 499
   });

   // 4. Save the document to the 'tour' collection in the DB (Testing Codes)
   testTour
      .save()
      .then(doc => console.log(doc))
      .catch(err => console.log('💥Error: ', err));

*/

const mongoose = require('mongoose');

// Creating a Schema
const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true
   },
   rating: {
      type: Number,
      default: 4.5
   },
   price: {
      type: Number,
      required: [true, 'A tour must have a price!']
   }
})

// Creating a Model
const Tour = mongoose.model('Tour', tourSchema);

// Default Exports
module.exports = Tour;