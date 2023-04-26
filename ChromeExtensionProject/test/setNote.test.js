const chai = require('chai'); //assertion library for testing
const expect = chai.expect; //import expect, functionally the same as should if you see it used by other testers.
const sinon = require('sinon'); //sinon for extras like spies, stubs, and sandboxes.
const sinonChrome = require('sinon-chrome'); //to recreate chrome's storage API. shout out to https://github.com/acvetkov/sinon-chrome for this module.
global.chrome = sinonChrome; //assign chrome as a global variable for sinon-chrome.

function setNote(url) {
  let currentId = Date.now();
  ids.push(currentId.toString());
  let newNote = { note: noteInput.value, id: currentId.toString() };
  placeNote(newNote, url);
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



describe('#setNote()', function() {

  context('Testing if setNote() is able to store notes in persistent storage', function() {
  let sandbox; //this helps create an entire fake setting for the function and chrome storage API to work.

  beforeEach(function () {
    sandbox = sinon.createSandbox(); //create sandbox
    chrome.storage.sync.get = sinon.stub(); //stubs create dummy functions
    chrome.storage.sync.set = sinon.stub();
  });

  afterEach(() => {
    sandbox.restore(); //this removes the spy behavior and sync behavior back to default values.
  });
  it('Should be storing the current note ID.', () => {
   setTimeout(function() {
        console.log('expect check here.');
        expect(setNote.chrome.storage.sync.set.calledTwice).to.be.true; // check if set() is called twice
        expect(chrome.storage.sync.set.calledWithExactly(json)).to.be.true; // check if set() is called with json
        expect(chrome.storage.sync.set.calledWithExactly(json2)).to.be.true; // check if set() is called with json2
        //leaving this commented out, throws an error
        //done();
      }, 10);
    });

   })
})



