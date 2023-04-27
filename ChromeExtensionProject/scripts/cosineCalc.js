const genres = [ //this CANNOT be random. It must be the same in order to properly vector. I mean I guess you can randomize it and then assign it this order, but why? 
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

async function fetchBooksForGenres(genres) { //fetch is an async function and await will  hold until response from api is given
    let genreVectors = []; //vector array for genres
  
    for (const genre of genres) {  //loop over genres array 
      try {
        const encodedGenre = encodeURIComponent(`subject:${genre}`); //encode genre string so books api plays nicely 
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodedGenre}&maxResults=40&key=AIzaSyBpX2SuynVFbjboDJamz2a7OEtXBh2LHLc`); //this catches the genre of the top 40 results of the 10 genre array. 
        const data = await response.json();
        genreVectors.push(data.items); //add book data to genre vector
      } catch (error) {
        console.error('Error fetching books for genre:', genre, error); //this will throw an error if you can't get the genres somehow (API key expires)
      }
    }
  
    return genreVectors; 
  }
  //now, need to compare two non-zero vectors of dot product. Imagine it being similar to measuring the angle between two lines. 
  
  function cosineSimilarity(userVector, genreVector) {
    let dotProduct = 0; //x1 * x2 + y1 * y2, measures the similarity. 
    let userVectorMagnitude = 0; //define vector magnitude as zero. the formula for vector magnitude is |x| = sqrt(x^2 + y^2)
    let genreVectorMagnitude = 0; 
  
    for (let i = 0; i < userVector.length; i++) { //loop to compute each genreVector and compare it to the userVector. (O(n) function)
      dotProduct += userVector[i] * genreVector[i]; //x1 * x2 + y1 * y2
      userVectorMagnitude += userVector[i] * userVector[i]; //x^2
      genreVectorMagnitude += genreVector[i] * genreVector[i]; //y^2
    }
  
    userVectorMagnitude = Math.sqrt(userVectorMagnitude); //sqrt(x^2)
    genreVectorMagnitude = Math.sqrt(genreVectorMagnitude); //sqrt(y^2)
  
    return dotProduct / (userVectorMagnitude * genreVectorMagnitude); //x1 * x2 + y1 * y2 / sqrt(x^2 ) *sqrt(y^2)
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-recommendations"); //click button load code
  
    generateButton.addEventListener("click", function () { //click button
      // Call the function to generate recommendations
      generateRecommendations(); //load code
    });
  });
  
  async function generateRecommendations() { //await
    chrome.storage.sync.get('userVector', async function (data) { //get userVector saved to web storage. Will implement local later.
      let userVector = data.userVector;
      let genreVectors = await fetchBooksForGenres(genres); 
      let recommendations = []; //recommendations arr

      console.log("User vector:", userVector); //should be filled
  
      for (let i = 0; i < genreVectors.length; i++) { //O(mn)
        console.log('Genre vector for', genres[i], genreVectors[i]);
        let similarityScore = cosineSimilarity(userVector, genreVectors[i]);
        recommendations.push({ genre: genres[i], score: similarityScore, books: genreVectors[i] });
        console.log("Similarity Score:",similarityScore);
      }
  
      recommendations.sort((a, b) => b.score - a.score); 
  
      // Display top 50 books for each genre sorted by similarity
      recommendations.forEach(recommendation => {
        console.log(`Top 50 books in the "${recommendation.genre}" genre:`);
        recommendation.books.forEach(book => {
          console.log(book.volumeInfo.title);
        });
      });
    });
  }