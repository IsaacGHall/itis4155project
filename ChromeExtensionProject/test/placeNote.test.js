//these lines, some are necessary, but some are not. Boilerplate dependencies.

const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised'); //extra chai functionality.
const sinonChrome = require('sinon-chrome');
const { JSDOM } = require('jsdom');
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.window = new JSDOM().window; //creates dummy document
global.document = window.document; //these will be needed for any document.() testing
global.chrome = sinonChrome; //for any chrome storage things. This is just copy pasted from storeGenre.test.js in verbatim

//isolated function from notes.js

function placeNote(note, url, notesDiv) {
  let div = document.createElement('div');
  let p = document.createElement('p');
  div.append(p);
  
  p.textContent = note.title;
  div.classList.add("note");
  notesDiv.append(div);
  let button = document.createElement('button');
  button.addEventListener('click', function (e) {
      chrome.storage.sync.get([url], function (item) {
          let ids = JSON.parse(item[url]);
          ids.splice(ids.indexOf(note.id), 1);
          chrome.storage.sync.remove([url], function () {
              let json = {};
              json[url] = JSON.stringify(ids);
              chrome.storage.sync.set(json, function() {
                  chrome.storage.sync.remove([note.id], function() {
                      e.target.parentElement.replaceChildren();
                  })
              })
          });
      });
  });
  p.addEventListener('click', function () {
      scrollToLocation(note);
  })
  div.append(button);
  button.textContent = "[X]";
  button.classList.add("deleteNoteButton");
}

//function testing playground
describe('placeNote', () => { //this describes the placeNote function for testing purposes
    it('should create a new div element', () => {  
      const note = { //creates a note object
        id: 'note1', //gives note id
        note: 'This is a test note',
      };
      const url = 'https://example.com'; //any valid website should be tested here.
      const notesDiv = document.createElement('div'); //creates a div element for notesDiv
  
      placeNote(note, url, notesDiv); //function call
  
      const div = notesDiv.querySelector('div.note');
      expect(div).to.exist;
    });

    it('should set the text content of the p element to the note text', () => {
        const note = {
          id: 'note1',
          note: 'This is a test note',
        };
        const url = 'https://example.com';
        const notesDiv = document.createElement('div');
      
        placeNote(note, url, notesDiv);
      
        const p = notesDiv.querySelector('div.note p'); //checks p element is set to note text. 
        expect(p.textContent).to.equal(note.note); 
      });


  });
