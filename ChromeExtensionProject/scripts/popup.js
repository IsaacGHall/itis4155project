'use strict'


//key: url = [id1,id]  key: id1 = {note: "dfass", urls: []}



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
var ids = [];
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
    let url = tabs[0].url;
    alert(url);
    chrome.storage.sync.get([url], function(items) {
        keys = JSON.parse(items[url]);
        console.log(keys);
        alert(keys);
        let notes = "";
        // if(!notesAsObjects) {
        //     notes = "";
        // } else {
        //     notesAsObjects.forEach(note => 
        //         notes += note.note
        //     );
        // }
        for (let i = 0; i < keys.length; i++) {
            console.log(keys[i]);
            chrome.storage.sync.get([String.toString(keys[i])], function(items) {
                console.log(items[String.toString(keys[i])]);
                let temp = items[String.toString(keys[i])];
                notesAsObjects.push(temp);
                console.log(temp);
                alert(temp);
        });

        }
        notesAsObjects.forEach(note => {
            notes += note.note;
        });
       // keys.forEach(key =>
           // chrome.storage.sync.get(keys, function(items) {
                // chrome.storage.sync.get([key], function(items) {
                // notesAsObjects.push(items[key]);
                // notes += items[key].note;
                // alert(items[key]);
            //     notesAsObjects = items[keys];
            //     alert(notesAsObjects);
            //     notesAsObjects.forEach(note=> 
            //         notes += note.note
            //         );
            // });
          //  }));
           
        notesDiv.append(notes);

    });

});
// on add note
document.querySelector('#addNote').addEventListener('click', function(e) {
    notesDiv.append(noteInput.value);

    let newNote = {note: noteInput.value};

    //notesAsObjects.push(newNote);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs=> {
        let url = tabs[0].url;
        let currentId = Date.now();
        chrome.storage.sync.get([url], function(items) {
            if(items[url]) {
                ids = JSON.parse(items[url]);
            }
        });
        ids.push(currentId);
        let currentNote = JSON.stringify(newNote);
        let currentIds = JSON.stringify(ids);
        let json = {};
        let json2= {};
        json[currentId] = currentNote;
        json2[url] = currentIds;
        // if(!json[url]) {
        //     json[url] = noteInput.value;
        // } else {
        //     json[url] += noteInput.value;
        //}
        chrome.storage.sync.set(json, function() {
            console.log(newNote);
            //stores notes in persistence storage based on id
        });
        chrome.storage.sync.set(json2, function() {
            console.log(url);
            console.log(ids);
           //stores a list or ids with key url 
        });

        // chrome.storage.sync.set({url: ids});

        // chrome.storage.sync.set({currentId: newNote});

    });
    noteInput.textContent = "";
});

document.querySelector('#clearPage').addEventListener('click', function() {
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

