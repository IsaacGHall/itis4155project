'use strict'
// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
//     let url = tabs[0].url;
//     chrome.storage.sync.get([url], function(items) {
//         console.log((items[url]));
//     });

// });
var json = {};
var notesAsObjects = [{note : ""}];
var notesDiv = document.querySelector('#notes');
var noteInput = document.querySelector('#noteInput');

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
    let url = tabs[0].url;
    chrome.storage.sync.get({Keys :[url]}, function(items) {
        notesAsObjects = items[url];
        let notes = "";
        if(!notesAsObjects) {
            notes = "";
        } else {
            notesAsObjects.forEach(note => 
                notes += note.note
            );
        }
        notesDiv.append(notes);

    });

});
// on add note
document.querySelector('#addNote').addEventListener('click', function(e) {
    notesDiv.append(noteInput.value);
    let newNote = {note: noteInput.value};
    notesAsObjects.push(newNote);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
        let url = tabs[0].url;
        json[url] = notesAsObjects;
        // if(!json[url]) {
        //     json[url] = noteInput.value;
        // } else {
        //     json[url] += noteInput.value;
        //}
        alert(url);
        chrome.storage.sync.set(json, function() {
            // stores notes in persistence storage based on url
        });

    });
    noteInput.textContent = "";
});

document.querySelector('#clearPage').addEventListener('click', function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
        let url = tabs[0].url;
        chrome.storage.sync.remove([url], function() {
            // stores notes in persistence storage based on url
        });

    });
});

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
//     let url = tabs[0].url;
//     chrome.storage.sync.set([url], function() {
//         // stores notes in persistence storage based on url
//     });

// });

