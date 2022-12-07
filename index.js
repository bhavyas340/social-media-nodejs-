const express = require('express');
const app = express();
const port = 8000;


app.listen(port, function(err){
   if(err){
    // new this to write by help of Back ticks(``).
    console.log(`Error in running the server: ${err}`);
   }
   console.log(`Bs's Server is runnng on port: ${port}`); 
});