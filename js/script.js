const global = {
  currentPage: window.location.pathname
}


async function displayPopularMovies() {
  const {results} = await fetchAPIData("movie/popular");

  results.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = 
    `<a href="movie-details.html?id=${movie.id}">
      
      ${
        movie.poster_path 
        ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"/>`

        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`
      }

    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`
    document.getElementById("popular-movies").appendChild(div);
  })

  console.log(results);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // API keys shouldn't be directly put inside of js files but this web app is just for learning so it should be ok + it's a free key

  const API_KEY = "795ffcee559ac9c58d2b494143a05d7b"
  const API_URL = "https://api.themoviedb.org/3/"
  
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  return data;
}


// Highligth active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  })
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);