const hashForm  =  document.querySelector('#form1');
const displayHash = document.querySelector('#display-hash');
const displayInput = document.querySelector('#input-password');
const password = document.querySelector('[name="pwd"]');




hashForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  displayInput.innerHTML = 'Input password: '+password.value;
    
const rawPassword = {pwd:password.value};

  // send request to server with fetch
fetch('/password', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(rawPassword),
})
.then(res=>res.json())
.then(data=>{  
  displayHash.innerHTML ='Hash password: '+ data.pwd;
})
.catch(err=>console.log(err));  
  
  hashForm.reset();
})

