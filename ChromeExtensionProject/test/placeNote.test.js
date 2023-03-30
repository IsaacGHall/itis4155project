const { expect } = require('chai');
const chai = require('chai');
/*const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const chaiAsPromised = require('chai-as-promised'); //extra chai functionality.
const sinonChrome = require('sinon-chrome');
const { JSDOM } = require('jsdom');
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.window = new JSDOM().window; //creates dummy document
global.document = window.document; //these will be needed for any document.() testing
global.chrome = sinonChrome; //for any chrome storage things. This is just copy pasted from storeGenre.test.js in verbatim
//there will need to be more tests implemented. This is just a prototype for placeNote, just to get functionality for tests. 
*/
const { placeNote } = require('../scripts/notes'); //calls placeNote using nodeJS module.export.

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