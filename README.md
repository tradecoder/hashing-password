# hashing-password
Hashing Password with 'bcrypt'

(Using Node-Express)



```javascript

//const bcrypt  = require('bcrypt');

const passwordInput = 'hellotestme';
const wrongPasswordInput = 'gellotestme';
const saltRounds = 12;

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

```
