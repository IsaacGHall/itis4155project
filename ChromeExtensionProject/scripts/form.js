const genres = [ //this CANNOT be random. It must be the same in order to properly vector. I mean I guess you can randomize it and then assign it this order, but why? 
    'Science Fiction',
    'Mystery',
    'Romance',
    'History',
    'Biography',
    'Fantasy',
    'Horror',
    'Thriller',
    'Humor',
    'Graphic Novel'
]; 

let currentGenreIndex = 0; 
let userResponses = []; //empty user response array to be converted to userVector later. 

document.addEventListener('DOMContentLoaded', () => {
    displayGenreQuestions(); //checks to make sure that the content is loaded.
});

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('userForm');
    var radioButtons = form.querySelectorAll('input[type="radio"]'); //select all input types by radio and assign them the var.
    
    for (var i = 0; i < radioButtons.length; i++) { //iterate until no more buttons
      radioButtons[i].addEventListener('change', submitForm);
    }
  });

function submitForm() { //functionality to submit radio button forms. 
    const radioButtonElements = document.getElementsByClassName("radio-button");
    let selectedValue;
  
    for (const radioButton of radioButtonElements) { //this sets it so that the radio button can be used in the future after submitting
      if (radioButton.checked) { //checks if radio is selected.
        selectedValue = parseInt(radioButton.value, 10); //convert int to check if 10 values
        radioButton.checked = false;
        break;
      }
    }
  
    if (selectedValue !== undefined) {
      userResponses.push(selectedValue);  //push to selectedValue
      currentGenreIndex++; //i++
      displayGenreQuestions(); //operate function for next question/
    }
  
    if (currentGenreIndex === genres.length) {
        // End of questions
        console.log("All questions completed");
        console.log("User responses:", userResponses);
    
        // Save the userResponses directly to Chrome storage as userVector
        chrome.storage.sync.set({ userVector: userResponses }, function () { //assign userVector : UserResponses. For use later. 
          console.log("User vector saved:", userResponses);
          const form = document.getElementById('userForm'); //to hide
          form.style.display = 'none'; // hide the radio buttons
          const message = document.createElement('h1'); //to display
          message.textContent = 'Generating recommendations...'; //display
          const container = document.getElementById('generation-container'); //dont touch this. 
          container.appendChild(message); // display a message
          setTimeout(() => {
            window.location.href = "recommendations.html";
          }, 3000); //arbitrary timeout to make you think things are happening :)
        });
      }
    }

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); //this makes sure that the form data must be done if the user wants to access recommendations. 

    const formData = new FormData(event.target); //references form data and prepares it for submission. Provides a way to easily construct a set of key/value pairs representing form fields and their values. 
    const userVector = [];
    
    for (let i = 1; i <= 10; i++) { //iteration between questions.
        const value = formData.get(`question${i}`);
        userVector.push(value === "1" ? 1 : 0); //this uses 1 as yes for the vector and 0 for no. 
    }
        window.location.href = "recommendations.html"; //after vector is saved, user can just access their recommendations. 
    });

function createGenreHeading(genre, question) { //this is created to make  my life easier down the road
    const h1 = document.createElement('h1'); 
    h1.textContent = `${question} ${genre}?`; //makes it so that it says "question genre?" ex: "Do you like History?"
    return h1;
}

function displayGenreQuestions() {
    const heading = document.getElementById("genre-question"); 
    if (currentGenreIndex < genres.length) {
        if (currentGenreIndex < genres.length) { 
            const questions = [ //questions array for a little flair so its not as robotic as do you like x? do you like y?
              'Do you like',
              'How about',
              'Interested in',
              'Do you enjoy',
              'Are you a fan of',
              'Would you read',
              'Fond of',
              'What about',
              'Do you prefer',
              'Do you gravitate towards'
            ];
        
            const genre = genres[currentGenreIndex]; //access genres
            const questionIndex = currentGenreIndex % questions.length; //modulo to stay within bounds
            const question = questions[questionIndex]; //access questions
            heading.textContent = `${question} ${genre}?`; //updates text content
          } else {
            console.log("done");
          }
    }
}

