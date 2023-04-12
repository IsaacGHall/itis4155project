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
      const genre = book.categories ? book.categories.join(', ') : '';
      const coverUrl = book.imageLinks ? book.imageLinks.thumbnail : '';

      // Generate HTML code to display the book details
      const bookDetails = `
        <div class="book">
          <img src="${coverUrl}" alt="${title}">
          <div class="details">
            <h2>${title}</h2>
            <p><strong>Author(s):</strong> ${author}</p>
            <p><strong>Genre(s):</strong> ${genre}</p>
          </div>
        </div>
      `;

      // Insert the book details into the output div
      document.querySelector('#bookDetails').innerHTML = bookDetails;
    })
    // Handle any errors that occur during the fetch request
    .catch(error => console.error(error));
});
