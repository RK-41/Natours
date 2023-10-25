/*  22.10.

    SERVER FILE

    It's std. practice to have the codes related to the server and the express in separate files.

    ENVIRONMENT VARIABLES

    Defined by node.js
        EV are global variables used to define the environment in which node is running.
        
        Code: console.log(process.env)

    Defined by express.jsclear
        Code: console.log(app.get('env'))
*/
// Requiring Modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Environment Variables
// Cofiguring Environment Variables (Saving the env. variables of 'config.env' to node.js env. variables)
dotenv.config({ path: './config.env' });

// console.log(process.env)

// Requiring the 'app' module (Local Module)
const app = require('./app');

// console.log(app.get('env'));

// 23.10. DB STRING
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Connecting to the Database
mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindandModify: false,
   })
   .then(connection => {
      // console.log(connection.connections);
      console.log('DB Connection Successfull!');
   });


// Port
const port = process.env.PORT || 3000;

// Starting a server
app.listen(port, () => {
   console.log(`App running on the port ${port}...`);
}); 