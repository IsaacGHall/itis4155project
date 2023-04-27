document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("generate-recommendations").addEventListener("click", async function() {
      const recommendations = await window.generateRecommendations();
      console.log("Recommendations:", recommendations);
      createBubbleMap(recommendations);
    });
  });
  
  function showBookDetails(book) {
    const bookDetails = document.getElementById("book-details");
  
    // Replace the existing content in the book-details element
    bookDetails.innerHTML = `
      <h2>${book.title}</h2>
      <p><img src="${book.cover}" alt="${book.title}"></p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Description:</strong> ${book.summary}</p>
      <p><a href="${book.link}" target="_blank">Preview on Google Books</a></p>
    `;
  }
  
  
  function createBubbleMap() {
    chrome.storage.local.get('recommendations', function () {
      const recommendationsString = localStorage.getItem('recommendations');
      const recommendations = JSON.parse(recommendationsString);
  
      if (!recommendations) {
        console.error("No recommendations received.");
        return;
      }
  
      const svg = d3.select("#bubble-map");
      const width = +svg.attr("width");
      const height = +svg.attr("height");
  
      // Process recommendations data and create nodes for the bubble map
      const nodes = [];
      recommendations.forEach(recommendation => {
        if (recommendation.books) {
          recommendation.books.forEach(book => {
            nodes.push({
              title: book.volumeInfo.title,
              genre: recommendation.genre,
              cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
              summary: book.volumeInfo.description,
              link: book.volumeInfo.previewLink,
              radius: 20 // You can adjust the size of the bubbles here
            });
          });
        }
      });
  
      // Create a bubble layout using D3
      const bubbleLayout = d3.pack()
        .size([width, height])
        .padding(1.5);
  
      const root = d3.hierarchy({ children: nodes })
        .sum(d => d.radius);
  
      bubbleLayout(root);
  
      // Create bubbles with book title, cover, and genre information
      const bubbles = svg.selectAll("g")
        .data(root.children)
        .join("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
  
        bubbles.append("svg:image")
        .attr('x', d => -d.data.radius / 2)
        .attr('y', d => -d.data.radius / 2)
        .attr('width', d => d.data.radius)
        .attr('height', d => d.data.radius)
        .attr("xlink:href", d => d.data.cover);
  
      bubbles.append("text")
        .text(d => d.data.genre)
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .style("fill", "white");
  
      // Show book title when hovering over bubbles
      bubbles.on("mouseover", (event, d) => {
        d3.select(event.currentTarget).select("text")
          .text(d.data.title)
          .style("fill", "black");
      });
  
      bubbles.on("mouseout", (event, d) => {
        d3.select(event.currentTarget).select("text")
          .text(d.data.genre)
          .style("fill", "white");
      });
  
      // Show book details and link when clicking on bubbles
      bubbles.on("click", (event, d) => {
        // Display book details
        showBookDetails(d.data);
      
      // Open Amazon link for the book
      window.open(`https://www.amazon.com/s?k=${encodeURIComponent(d.data.title)}`, "_blank");
    });
  });
}
  