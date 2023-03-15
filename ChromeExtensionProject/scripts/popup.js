'use strict'

//key: url = [id1,id]  key: id1 = {note: "dfass", urls: []}

//this would only work if i put it at the top of the page
//need to figure out true random link per 24 hours & if this can go into a function
const date = new Date();
var newDateNumber = date.getFullYear() + date.getDay() * 2;
var dailyRandomBook = document.getElementById('randomBook').href = "https://www.gutenberg.org/ebooks/"+newDateNumber;

//very basic 24 hour book timer
console.log('init - line 132');
