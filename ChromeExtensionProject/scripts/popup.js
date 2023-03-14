'use strict'

//key: url = [id1,id]  key: id1 = {note: "dfass", urls: []}

//this would only work if i put it at the top of the page
//need to figure out true random link per 24 hours & if this can go into a function
const date = new Date();
var newDateNumber = date.getFullYear() + date.getDay() * 2;
var dailyRandomBook = document.getElementById('randomBook').href = "https://www.gutenberg.org/ebooks/"+newDateNumber;

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
//     let url = tabs[0].url;
//     chrome.storage.sync.get([url], function(items) {
//         console.log((items[url]));
//     });

// });
var notesAsObjects = [];
var keys = [];
var notesDiv = document.querySelector('#notes');
var noteInput = document.querySelector('#noteInput');
var ids = new Array();
chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    // alert(url);
    chrome.storage.sync.get([url], function (items) {

        if (items[url]) {
            keys = JSON.parse(items[url]);
            console.log(keys);
            let notes = "";
            // if(!notesAsObjects) {
            //     notes = "";
            // } else {
            //     notesAsObjects.forEach(note => 
            //         notes += note.note
            //     );
            // }
            chrome.storage.sync.get(keys, function (items) {
                console.log(items);
                keys.forEach(key => {
                    let noteObj = JSON.parse(items[key]);
                    notesAsObjects.push(noteObj);
                })
                notesAsObjects.forEach(note => {
                    notes += note.note;
                });
                notesDiv.append(notes);
            });
        }

    });

});
// on add note
document.querySelector('#addNote').addEventListener('click', function (e) {
    notesDiv.append(noteInput.value);
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
        let url = tabs[0].url;
        chrome.storage.sync.get([url], function (items) {
            console.log(items[url]);
            if (typeof items[url] === "undefined") {
                ids = [];
                setNote(url);
            } else {
                ids = JSON.parse(items[url]);
                chrome.storage.sync.remove([url], function () {
                    //removes current list of ids so that same url key can be used agin
                    console.log("old ids" + ids);
                    setNote(url);
                });
            }
        });

        // chrome.storage.sync.set({url: ids});

        // chrome.storage.sync.set({currentId: newNote});

    });
});

function setNote(url) {
    let currentId = Date.now();
    ids.push(currentId.toString());
    let newNote = { note: noteInput.value };
    let currentNote = JSON.stringify(newNote);
    let currentIds = JSON.stringify(ids);
    let json = {};
    let json2 = {};
    json[currentId] = currentNote;
    json2[url] = currentIds;
    console.log(json);
    console.log(json2);
    chrome.storage.sync.set(json, function () {
        //stores notes in persistence storage based on id
        chrome.storage.sync.set(json2, function () {
            //stores a list or ids with key url 
            noteInput.textContent = "";
        });
    });
}


document.querySelector('#clearPage').addEventListener('click', function () {
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
    //     let url = tabs[0].url;
    //     chrome.storage.sync.remove([url], function() {
    //         // stores notes in persistence storage based on url
    //     });

    // });
    chrome.storage.sync.clear();
});

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
//     let url = tabs[0].url;
//     chrome.storage.sync.set([url], function() {
//         // stores notes in persistence storage based on url
//     });

// });

//very basic 24 hour book timer
console.log('init - line 132');



