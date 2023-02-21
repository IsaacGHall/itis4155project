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
var ids = [];

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
    let url = tabs[0].url;
    alert(url);
    chrome.storage.sync.get([url], function(items) {
        keys = items[url];
        alert(keys);
        let notes = "";
        // if(!notesAsObjects) {
        //     notes = "";
        // } else {
        //     notesAsObjects.forEach(note => 
        //         notes += note.note
        //     );
        // }
        
        //keys.forEach(key =>
            chrome.storage.sync.get([keys], function(items) {
                //notesAsObjects.push(items[key]);
                //notes += items[key].note;
                //alert(items[key]);
                notesAsObjects = items;
                alert(notesAsObjects);
            });
            //}));
           
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
        let currentId = Date.now();
        json[currentId] = newNote;

        chrome.storage.sync.get([url], function(items) {
            if(items[url]) {
                ids = items[url];
            }
        });
        
        ids.push(currentId);
        json2[url] = ids;
        // if(!json[url]) {
        //     json[url] = noteInput.value;
        // } else {
        //     json[url] += noteInput.value;
        //}
        //chrome.storage.sync.set(json, function() {
            // stores notes in persistence storage based on id
        //});
        //chrome.storage.sync.set(json2, function() {
           // stores a list or ids with key url 
        //});

        chrome.storage.sync.set({url: ids});

        chrome.storage.sync.set({currentId: newNote});

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

