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
  //the removal of fetchBooksForGenres was necessitated because I was misinterpreting how the data would have been read. I actually needed to display book data to the user instead of being displayed from the genreVector.
  //instead, I decided to implement an arbitrary genreVector that would have non-zero values if the corresponding value in the userVector is 1, and would be NaN if 0. 
  //This implementation works as needed. (Somewhat inaccurate similarity score representation, but will deliver books as needed, and only to genres user requested.)
  async function generateGenreVector(genre, userVector) { 
    const index = genres.indexOf(genre); //find index of genre, and set it to genres array. (This associates the two.)
    const vector = Array(genres.length).fill(0); //fill vector array with zeroes
    if (userVector[index] === 1) { //if the userVector value is 1, arbitrarily generate values that are inserted into vector arrays.
      vector[index] = Math.floor(Math.random() * 10) + 1; 
    }
    return vector;
  }
  
  async function fetchGenreVectors(genres, userVector) {
    const genreVectors = []; 
    for (const genre of genres) { //iterate each genre in genres array
      try {
        const encodedGenre = encodeURIComponent(`subject:${genre}`);  //encode genre string so books api plays nicely 
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodedGenre}&maxResults=40&key=AIzaSyBpX2SuynVFbjboDJamz2a7OEtXBh2LHLc`); //this catches the genre of the top 40 results of the 10 genre array.
        const data = await response.json(); 
        const genreVector = await generateGenreVector(genre, userVector); //await code to run
        const books = data.items || []; // handle case where no books are returned for the genre, and stops any errors if undefined, instead define as empty.
        genreVectors.push({ genre, vector: genreVector, books }); //add to genreVectors array, and book data. 
      } catch (error) {
        console.error('Error fetching books for genre:', genre, error); 
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
      generateRecommendations(); //load code
    });
  });
  
  async function generateRecommendations() { 
    chrome.storage.sync.get('userVector', async function (data) { //get userVector saved to web storage. Will implement local later.
      let userVector = data.userVector; //get data from userVector.
      let genreVectors = await fetchGenreVectors(genres, userVector); 
      let recommendations = []; //recommendations arr
      console.log("User vector:", userVector); //should be filled 
      for (let i = 0; i < genreVectors.length; i++) { //O(mn)
        console.log('Genre vector for', genres[i], genreVectors[i].vector); //iterate line above over each genre vector in the genreVectors array, and print.
        let similarityScore = cosineSimilarity(userVector, genreVectors[i].vector);  //calc sim score
        recommendations.push({ genre: genres[i], score: similarityScore, books: genreVectors[i].books }); //add object containing array info
        console.log("Similarity Score:", similarityScore); //log simscore. testing only
      }
      recommendations.sort((a, b) => b.score - a.score); //descending order. 

      //redone for proof of concept. Only display the 1st book rn
      recommendations.forEach(recommendation => {
        console.log(`Top book in the "${recommendation.genre}" genre:`);
        if (recommendation.score > 0 && recommendation.books.length > 0) { //if score not 0 or NAN(?), and books exist, display.
          console.log(recommendation.books[0].volumeInfo.title);
        } else {
          console.log("No book data to display."); //no book :(
        }
      });
    });
  }
