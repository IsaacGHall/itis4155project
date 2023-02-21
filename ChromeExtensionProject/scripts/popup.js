'use strict'


//key: url = [id1,id]  key: id1 = {note: "dfass", urls: []}



// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
//     let url = tabs[0].url;
//     chrome.storage.sync.get([url], function(items) {
//         console.log((items[url]));
//     });

// });
var json = {};
var json2= {};
var notesAsObjects = [];
var keys = new Array();
var notesDiv = document.querySelector('#notes');
var noteInput = document.querySelector('#noteInput');
var currentId = 0;

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
    let url = tabs[0].url;
    chrome.storage.sync.get([url], function(items) {
        keys = items[url];
        let notes = "";
        // if(!notesAsObjects) {
        //     notes = "";
        // } else {
        //     notesAsObjects.forEach(note => 
        //         notes += note.note
        //     );
        // }
        if(!keys) {
            notes = "";
        } else {
            console.log(keys);
            keys.forEach(key =>
                chrome.storage.sync.get([key], function(items) {
                    if(items[key]) {
                        notesAsObjects.push(items[key]);
                    }
                }));
           
        }
        notesDiv.append(notes);

    });

});
// on add note
document.querySelector('#addNote').addEventListener('click', function(e) {
    notesDiv.append(noteInput.value);

    let newNote = {note: noteInput.value};

    console.log(newNote);
    //notesAsObjects.push(newNote);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
        let url = tabs[0].url;
        json[currentId] = newNote;
        console.log(keys);
        let ids = [];
        chrome.storage.sync.get([url], function(items) {
            if(items[url]) {
                ids = items[url];
            }
        });
        console.log(ids);
        ids.push(currentId);
        currentId++;
        json2[url] = ids;
        // if(!json[url]) {
        //     json[url] = noteInput.value;
        // } else {
        //     json[url] += noteInput.value;
        //}
        alert(url);
        chrome.storage.sync.set(json, function() {
            // stores notes in persistence storage based on id
        });
        chrome.storage.sync.set(json2, function() {
           // stores a list or ids with key url 
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

