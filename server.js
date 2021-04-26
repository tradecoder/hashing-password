// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bcrypt =  require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// const passwordInput = 'hellotestme';
// const wrongPasswordInput = 'gellotestme';
const saltRounds = 12;


// const storedPasswordWithHash = bcrypt.hashSync(passwordInput, saltRounds);
// console.log('Main Pasword: '+ storedPasswordWithHash);
// // const hash2 = bcrypt.hashSync(plainPassword2, saltRounds);
// // console.log('Other Password: '+ hash2);


// bcrypt.hash(storedPasswordWithHash, saltRounds, (err, hash) => {
//   console.log(hash);
  
//   // Testing with wrong password
//   bcrypt.compare(wrongPasswordInput, storedPasswordWithHash, (err, res) => {
//     console.log('With wrong password: '+ res); 
//     // false
    
    
//     // Testing with correct password
//   bcrypt.compare(passwordInput, storedPasswordWithHash, (err, res)=>{
//     console.log('With right password: '+ res);
//     // true
//   })
    
//   });
// });




// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.post("/password", (req, res) => {  
  const {pwd} = req.body;
  const hashPassword = bcrypt.hashSync(pwd, saltRounds);
  // express helps us take JS objects and send them as JSON
  res.json({pwd:hashPassword});
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
