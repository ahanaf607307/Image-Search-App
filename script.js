const accessKey = "o6aPrJomQZeGh3bZFjKy7C83cHsMMmcOducWc81Roj0";

const inputSection = document.querySelector("form");

const inputSearch = document.querySelector("#inputSearch");

const searchResults = document.querySelector(".searchResults");

const seeMoreBtn = document.querySelector(".seemoreBtn");

// for see more button
let inputData = "";
let page = "1";

async function searchImages() {
  inputData = inputSearch.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("searchResult");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imgLink = document.createElement("a");
    imgLink.href = result.links.html;
    imgLink.target = "_blank";

    imgLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imgLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    seeMoreBtn.style.display = "block";
  }
}

inputSection.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages() ;
  });
  seeMoreBtn.addEventListener("click", () => {
    
    searchImages() ;
  });
  