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


   26.10.23
      Modified the 'tourSchema': Added several new fields.

*/

const mongoose = require('mongoose');

// Creating a Schema
const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
      trim: true
   },
   duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
   },
   maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
   },
   difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty']
   },
   ratingsAverage: {
      type: Number,
      default: 4.5
   },
   ratingssQuantity: {
      type: Number,
      default: 0
   },
   price: {
      type: Number,
      required: [true, 'A tour must have a price!']
   },
   priceDiscount: Number,
   summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
   },
   description: {
      type: String,
      trim: true
   },
   imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
   },
   images: [String],
   createdAt: {
      type: Date,
      default: Date.now()
   },
   startDates: [Date]
})

// Creating a Model
const Tour = mongoose.model('Tour', tourSchema);

// Default Exports
module.exports = Tour;