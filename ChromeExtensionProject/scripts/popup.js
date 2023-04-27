'use strict'

//key: url = [id1,id]  key: id1 = {note: "dfass", urls: []}

//this would only work if i put it at the top of the page
//need to figure out true random link per 24 hours & if this can go into a function
const date = new Date();
var newDateNumber = date.getFullYear() + date.getDay() * 2;

document.getElementById("openGenreMap").addEventListener("click", function() { //on click of genre map, run this. 
    chrome.storage.sync.get("userVector", function(result) {
        const userVector = result.userVector;  //user vector will be added to recommendation stuff later. 

        if (userVector && userVector.length === 10) { //checks for user vector saved to profile, if so, go to genre map.
            window.location.href = "genremap.html"; //you did it
        } else {
            window.location.href = "form.html"; //else finish the form. 
        }
    });
});