document.addEventListener("DOMContentLoaded", () => {
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");


// Event listener for search button click
btn.addEventListener("click", () => {
    //'w' is assigned to the word entered in the search box
    let w = document.getElementById("inp-word").value;
    //looks for word using freeDictionaryAPI 
    fetch(`${url}${w}`)
        .then((response) => response.json())
        .then((data) => {
            //Results for 'w' including: word, part of speech, pronunciation, definition 
            result.innerHTML = `
            <div class="word">
            <p> <font size = 4> <b>${w}</b>  </font> <i> <font size = 1>
                    
                   ${data[0].meanings[0].partOfSpeech}, 
                    ${data[0].phonetic}</p> </font> <i>
                </div>
                <p class="definition">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                `;
        })
        //Results if 'w' does not exist in the dictionary
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
});