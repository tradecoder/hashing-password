// server.js

const express = require("express");
const app = express();
const bcrypt =  require('bcrypt');

const passwordInput = 'hellotestme';
const wrongPasswordInput = 'gellotestme';
const saltRounds = 8;

// Convert plain password to hash
const storedPasswordWithHash = bcrypt.hashSync(passwordInput, saltRounds);
console.log('Main Pasword: '+ storedPasswordWithHash);

// Compare the hash
bcrypt.hash(storedPasswordWithHash, saltRounds, (err, hash) => {
  console.log(hash);
  
  // Testing with wrong password
  bcrypt.compare(wrongPasswordInput, storedPasswordWithHash, (err, res) => {
    console.log('With wrong password: '+ res); 
    // false
    
    
    // Testing with correct password
  bcrypt.compare(passwordInput, storedPasswordWithHash, (err, res)=>{
    console.log('With right password: '+ res);
    // true
  })    
    
  });
});

// Your project codes here

// // make all the files in 'public' available
// // https://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

// // https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
// });



// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
