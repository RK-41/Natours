/* 26.10.23

   Script to Import the Data into the DB

*/

// Requiring Modules
const fs = require('fs');
const mongoonse = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

// Configuring the Environment Variables
dotenv.config({ path: './config.env' });

// DB String
const DB = process.env.DATABASE.replace(
   '<password>',
   process.env.DATABASE_PASSWORD
);

// Connecting to the DB
mongoonse
   .connect(DB, {
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   .then(() => console.log('DB Connection Successful!!'));

// Reading JSON File
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));

// Importing the Data into the DB
const importData = async () => {
   try {
      await Tour.create(tours);
      console.log('Data Successfully Loaded!!');
   } catch (err) {
      console.log('💥', err);
   }
   process.exit(); e
}

// Delete all the Data from the DB
const deleteData = async () => {
   try {
      await Tour.deleteMany();
      console.log('Data Successfully Deleted!!');
   } catch (err) {
      console.log(err);
   }
   process.exit();
}

if (process.argv[2] === '--import') {
   importData();
} else if (process.argv[2] === '--delete') {
   deleteData();
}

console.log(process.argv);