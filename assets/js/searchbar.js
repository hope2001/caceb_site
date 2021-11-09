//const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const endpoint = 'assets/js/dataset.json';

const cities = [];

// fetch grabs endpoint - at this point a promise and generates readablestream
fetch(endpoint)
    
  .then(blob => blob.json())
  .then(data => cities.push(...data));
    console.log(endpoint)
function findMatches(keyword, cities) {
  return cities.filter(place => {
    // does city or state match? use paramater regex
    const regex = new RegExp(keyword, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

// add results to HTML li
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(place => {
    
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    
    return `
      <li class="d-flex flex-column p-2 col-4 card alert-warning border border-danger border-2 m-1 shadow">
        <span class="name"> <span class="text-danger "> ${cityName}</span>,<span class="text-success"> ${stateName}</span></span>
        <span class="population text-info">${place.population}</span>
      </li>
    `;
  }).join('');
  
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search-input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

