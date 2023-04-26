const genres = [ //this CANNOT be random. It must be the same in order to properly vector.
    'Science Fiction',
    'Mystery',
    'Romance',
    'History',
    'Biography',
    'Fantasy',
    'Horror',
    'Thriller',
    'Young Adult',
    'Graphic Novel'
];

document.addEventListener('DOMContentLoaded', () => {
    displayGenreQuestions(); //checks to make sure that the content is loaded.
});

function submitForm() { //simple change to allow for submitting functionality within radio buttons.
    const form = document.getElementById("userForm");
    form.submit();
}

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); //this makes sure that the form data must be done if the user wants to access genre map. 

    const formData = new FormData(event.target); //references form data and prepares it for submission. 
    const userVector = [];
    
    for (let i = 1; i <= 10; i++) { //iteration between questions.
        const value = formData.get(`question${i}`);
        userVector.push(value === "1" ? 1 : 0); //this uses 1 as yes for the vector and 0 for no. 
    }
    
    chrome.storage.sync.set({userVector: userVector}, function() {
        console.log("User vector saved.");
        window.location.href = "genremap.html"; //after vector is saved, user can just access their genremap. 
    });
});





