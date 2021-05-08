# hashing-password

Hashing Password with 'bcrypt'

(Using Node-Express)

```javascript
//const bcrypt  = require('bcrypt');

const passwordInput = "hellotestme";
const wrongPasswordInput = "gellotestme";
const saltRounds = 12;

// Convert plain password to hash
const storedPasswordWithHash = bcrypt.hashSync(passwordInput, saltRounds);
console.log("Main Pasword: " + storedPasswordWithHash);

// Compare the hash
bcrypt.hash(storedPasswordWithHash, saltRounds, (err, hash) => {
  console.log(hash);

  // Testing with wrong password
  bcrypt.compare(wrongPasswordInput, storedPasswordWithHash, (err, res) => {
    console.log("With wrong password: " + res);
    // false

    // Testing with correct password
    bcrypt.compare(passwordInput, storedPasswordWithHash, (err, res) => {
      console.log("With right password: " + res);
      // true
    });
  });
});
```

## Implementation for login

```javascript 
router.route("/login/:username/:password")
.post((req, res)=>{
    const {username, password} = req.params;
    
    Users.findOne({username})
    .then(user=>{
        bcrypt.hash(()=>{
        bcrypt.compare(password, user.password, (err, data)=>{        
           if(data){              
           res.send({userid:user._id, username:user.username, firstName:user.firstName});
           } else{
               res.send({error:'password or username not matched!'});
           }
       })
    }) 
})
  
    .catch(err=>res.send(err))
})

```

## Linked Project and project code

Linked project code is not storing or comparing any data. It's just generating and displaying hash

[https://hashing-password.glitch.me](https://hashing-password.glitch.me)

## Server code

server.js

```javascript
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.post("/password", (req, res) => {
  const { pwd } = req.body;
  const hashPassword = bcrypt.hashSync(pwd, saltRounds);
  // express helps us take JS objects and send them as JSON
  res.json({ pwd: hashPassword });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
```

## Script

script.js

```javascript
const hashForm = document.querySelector("#form1");
const displayHash = document.querySelector("#display-hash");
const displayInput = document.querySelector("#input-password");
const password = document.querySelector('[name="pwd"]');

hashForm.addEventListener("submit", e => {
  e.preventDefault();
  displayInput.innerHTML = "Input password: " + password.value;

  const rawPassword = { pwd: password.value };

  // send request to server with fetch
  fetch("/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(rawPassword)
  })
    .then(res => res.json())
    .then(data => {
      displayHash.innerHTML = "Hash password: " + data.pwd;
    })
    .catch(err => console.log(err));

  hashForm.reset();
});
```

## HTML code

index.html

```html
<section>
  <form id="form1">
    <label>
      Input your password
      <input
        name="pwd"
        type="password"
        maxlength="16"
        required
        placeholder="Type your password here"
      />
    </label>
    <button type="submit" id="submit-password">Submit</button>
  </form>
</section>
<section>
  <p id="input-password"></p>
  <p id="display-hash"></p>
</section>
```
