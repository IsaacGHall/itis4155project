const chai = require('chai'); //assertion library for testing
const expect = chai.expect; //import expect, functionally the same as should if you see it used by other testers.
const sinon = require('sinon'); //sinon for extras like spies, stubs, and sandboxes.
const sinonChrome = require('sinon-chrome'); //to recreate chrome's storage API. shout out to https://github.com/acvetkov/sinon-chrome for this module. 
global.chrome = sinonChrome; //assign chrome as a global variable for sinon-chrome. 

describe('storeGenre', () => { //describe is a mocha term that groups tests together 
  let sandbox; //this helps create an entire fake setting for the function and chrome storage API to work. 

  beforeEach(function () {
    sandbox = sinon.createSandbox(); //create sandbox
    chrome.storage.sync.get = sinon.stub(); //stubs create dummy functions
    chrome.storage.sync.set = sinon.stub();
  });

  afterEach(() => {
    sandbox.restore(); //this removes the spy behavior and sync behavior back to default values.
  });

  it('Should be storing a new genre.', () => {
    const genre = 'action';
    const items = {};
    const callback = sandbox.spy(); //creates a spy function that records args passed

    chrome.storage.sync.get.withArgs(['genre']).yields(items); 

    storeGenre(genre);

    expect(chrome.storage.sync.get.calledOnceWith(['genre'])).to.be.true; 
    expect(chrome.storage.sync.set.calledOnce).to.be.true; 
    expect(chrome.storage.sync.set.calledWith({genre: JSON.stringify([genre])})).to.be.true;
  });
});
// store a new genre parameter as a string representing one genre. 
// this is a copy of the function used in the notes.js file. With one sole exception shown below.
function storeGenre(genre) {
    chrome.storage.sync.get(['genre'], function (items) {
        let json = {};
        let genres = [];
        if (items['genre']) { 
            genres = JSON.parse(items['genre']);
            genres.push(genre); //the testing framework does not use put and can not use put unless I basically define push as put in a separate utility file and export it. So for normal purposes, this uses push instead.
            json['genre'] = JSON.stringify(genres);
            chrome.storage.sync.set(json, function() {
            })
        } else { // else if there are no genres already in the array
            genres.push(genre);
            json['genre'] = JSON.stringify(genres);
            chrome.storage.sync.set(json, function() {
            })
        }
    });
}

