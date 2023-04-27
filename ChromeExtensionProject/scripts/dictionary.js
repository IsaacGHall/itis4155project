const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let w = document.getElementById("inp-word").value;
    fetch(`${url}${w}`)
        .then((response) => response.json())
        .then((data) => {
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
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});