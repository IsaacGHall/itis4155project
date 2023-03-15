const container = document.createElement('div'); //create div
container.id = 'note-overlay-container'; //everything is specifically named to prevent simple overrides.
container.style.cssText = `
  background: rgb(54, 128, 103);
  padding: 20px;
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  font-size: 14px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 20; 
  margin: 10px;
`;

const createNotationButton = (text, top, left, onClick) => { //attrs used below. 
  const button = document.createElement('button'); //make button
  button.innerText = text; 
  button.style.cssText = `
    background: none;
    border: 1px #228B22;
    cursor: pointer;
    font-family: CerebriSans-Regular, -apple-system, system-ui;
    font-size: ${text === '★' ? '20px' : '16px'}; 
    font-weight: ${text === 'X' ? 'bold' : 'normal'};
    position: absolute;
    background-color: #307256;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    width: 30px;
    border-radius: 5px;
    height: 30px;
    color: ${text === '★' ? '#ffff00' : '#7B1818'};
    top: ${top};
    ${left ? `left: ${left};` : `right: 10px;` }
  `; //in the above text, strict equality and ternary operators (if-else) are used to distinguish between the two symbols while consolidating code.
  button.addEventListener('click', onClick);
  //add exit button code here to minimize application into a smaller window.
  //also add favorite button code here which saves URLs and associates them with webpage titles to each user in a favorites list.
  container.appendChild(button); //appendChild tells the DOM div to display inside div.
 //this will be expanded and iterated on in the future. 
  return button;
};

createNotationButton('★', '10px', '10px', () => {}); //text positions, and the event listeners are empty atm. 
createNotationButton('X', '10px', null, () => {}); //setting to null will put the exit on the right.

//I may integrate submit into the createNotationButton code at some point in the future, but as of right now, it stays
const notationSubmitButton = document.createElement('button');
notationSubmitButton.innerText = 'Submit';
notationSubmitButton.style.color = '#fff';
notationSubmitButton.style.backgroundColor = '#307256';
notationSubmitButton.style.border = '1px #228B22'; 
notationSubmitButton.style.borderRadius = '5px'; 
notationSubmitButton.style.cursor = 'pointer';
notationSubmitButton.style.boxShadow = '0px 2px 2px rgba(0, 0, 0, 0.25)';
notationSubmitButton.style.fontFamily = 'CerebriSans-Regular, -apple-system, system-ui';
notationSubmitButton.style.fontSize = '14px';
notationSubmitButton.style.position = 'absolute';
notationSubmitButton.style.padding = '5px 10px';
notationSubmitButton.style.bottom = '10px';
notationSubmitButton.style.right = '10px';
//TODO -- add submit button code to submit notes to user's array of notes.
//The above code was the first iteration, and I tried cleaning it up for readability's sake. 
container.appendChild(notationSubmitButton); 

const heading = document.createElement('div');
heading.innerText = `Notes for ${document.title}`; //This will display each URL's "title" for the user.
heading.style.cssText = `
  color: #fff;
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  margin-top: 20px;
`;
container.appendChild(heading);

const textarea = document.createElement('textarea'); //this may be subject to change as it currently is being overridden by page size.
textarea.id = 'notationBox';
textarea.name = 'notationBox';
textarea.rows = 5; 
textarea.cols = 55;
textarea.style.cssText = `
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  padding: 10px;
  background-color: white;
  resize: none;
  overflow: hidden;
`;
textarea.placeholder = 'Enter notes here...';
container.appendChild(textarea);
//This needs to be adjusted for Responsive Web Design.

document.body.appendChild(container); //end of document body