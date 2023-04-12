const chai = require('chai'); //assertion library for testing
const expect = chai.expect; //import expect, functionally the same as should if you see it used by other testers.
const sinon = require('sinon'); //sinon for extras like spies, stubs, and sandboxes.
const sinonChrome = require('sinon-chrome'); //to recreate chrome's storage API. shout out to https://github.com/acvetkov/sinon-chrome for this module.
global.chrome = sinonChrome; //assign chrome as a global variable for sinon-chrome.
const { setNote } = require('../scripts/notes');


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
    console.log('expect check here.');
    expect(setNote.chrome.storage.sync.set.calledTwice).to.be.true; // check if set() is called twice
    //expect(chrome.storage.sync.set.calledWithExactly(json)).to.be.true; // check if set() is called with json
    //expect(chrome.storage.sync.set.calledWithExactly(json2)).to.be.true; // check if set() is called with json2
    });

   })
})



