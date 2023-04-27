// Select the button element with id "randomBookLink"
const rbotdButton = document.querySelector('#randomBookLink');

// Add an event listener for a click on the button
rbotdButton.addEventListener('click', () => {
  // Set the URL for the Google Books API
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=AIzaSyBpX2SuynVFbjboDJamz2a7OEtXBh2LHLc`;

  // Send a fetch request to the API
  fetch(url)
    // Convert the response to JSON format
    .then(response => response.json())
    // Extract data from the response and generate a random book index
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const book = data.items[randomIndex].volumeInfo;
      const title = book.title;
      const author = book.authors.join(', ');
      //formats the genre so the first letter is capitalizesd and the rest are lowercase
      const genre1 = book.categories ? book.categories.join(', ') : '';
      const genre0 = genre1.toLowerCase();
      const r = genre0.slice(1);
      const f = genre1.charAt(0)
      const genre = f + r;

      const coverUrl = book.imageLinks ? book.imageLinks.thumbnail : '';

      // Generate HTML code to display the book details, including a link to the book's details page
      const bookDetails = `
      <style>
          .bookinfo {
          display: grid;
          grid-template-columns: 40% 60%;
        }
        .cover {
          flex: 50%;
        }
          .details {
          flex: 50%;
        }
          a {
            color: rgb(54, 128, 103);
        }
      </style>

      <div class="bookinfo">
      <div class="cover">
      <img src="${coverUrl}" alt="${title}" style = "padding:10px">   </div>
      
      <div class="details">
      <h2><a href = "${book.infoLink} "target="_blank" rel="noopener">${title}</a></h2>
      <p><strong>Author(s):</strong> ${author}</p>
      <p><strong>Genre(s):</strong> ${genre}</p>   </div>
      </div>
      `;



      // Insert the book details into the output div
      document.querySelector('#bookDetails').innerHTML = bookDetails;
    })
    // Handle any errors that occur during the fetch request
    .catch(error => console.error(error));
});
