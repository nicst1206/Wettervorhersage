function searchForCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let heading = document.querySelector("#city");
  heading.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForCity);
