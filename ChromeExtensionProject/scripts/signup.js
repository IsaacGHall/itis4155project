'use strict'

document.querySelector('#signUpButton').addEventListener('click', function () {
    let email = document.querySelector('#email').value;
    createUser(email);
    
    window.location.pathname("/views/notes.html");
});

function createUser(email){
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let password = document.querySelector('#password').value;
    let users = {};
    let user = {email: email, password: password, firstName: firstName, lastName: lastName};
    users[email] = JSON.stringify(user);
    chrome.storage.sync.set(users, function(){
        console.log(users);
    });
}