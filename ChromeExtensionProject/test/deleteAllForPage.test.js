const chai = require('chai'); //assertion library for testing
const expect = chai.expect; //import expect, functionally the same as should if you see it used by other testers.
const sinon = require('sinon'); //sinon for extras like spies, stubs, and sandboxes.
const sinonChrome = require('sinon-chrome'); //to recreate chrome's storage API. shout out to https://github.com/acvetkov/sinon-chrome for this module.
global.chrome = sinonChrome; //assign chrome as a global variable for sinon-chrome.
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { JSDOM } = require('jsdom');
global.window = new JSDOM().window; //creates dummy document
global.document = window.document;

//creating an isolated function for deleteAllForPage

function deleteAllForPage() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async tabs => {
        let url = tabs[0].url;
        chrome.storage.sync.get([url], function (items) {
            if (typeof items[url] === "undefined") {
                //Empty list for URL
            } else {
                let idsRemove = JSON.parse(items[url]);
                chrome.storage.sync.remove(idsRemove, function () {
                    chrome.storage.sync.remove([url]);
                    //Removes notes from URL
                    notesDiv.replaceChildren();
                });
            }
        });


    });
}

describe('deleteAllForPage', function() {
    //sandbox = sinon.createSandbox();
    beforeEach(function(){
        chrome.storage.sync.get = sinon.stub();
        chrome.tabs.query = sinon.stub();
        chrome.storage.sync.remove = sinon.stub();
    });
    afterEach(function(){
    sinon.restore();
    });
    it('insert description here',function() {
    const url = "https://google.com";
    const notesDiv = document.createElement('div');
    chrome.tabs.query.callsArgWith(1,[{url}]);
    chrome.storage.sync.get.withArgs([url]).yields({});

    deleteAllForPage();
    //pass (for now)
    console.log(chrome.storage.sync.remove.args);
    expect(chrome.storage.sync.remove.calledWith([url])).to.be.false;

    expect(notesDiv.children).to.be.empty;


    });    
});


