//const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const endpoint = 'assets/js/dataset.json';

const cities = [];

// fetch grabs endpoint - at this point a promise and generates readablestream
fetch(endpoint)
    
  .then(blob => blob.json())
  .then(data => cities.push(...data));
    
function findMatches(keyword, cities) {
  return cities.filter(place => {
    // does city or state match? use paramater regex
    const regex = new RegExp(keyword, 'gi');
    return place.socity.match(regex) || place.state.match(regex)
  });
}

// add results to HTML li
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(place => {
    
    const regex = new RegExp(this.value, 'gi');
    const socity_name = place.socity.replace(regex, `<span class="highlight">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    
    return `
      <li class="d-flex flex-column p-2 col-4 card alert-warnin border border-danger border-2 m-1 shadow">
        <span class="name my-1"> <span class="text-danger "> <strong class="text-dark">Nom:</strong> ${socity_name}</span>,<span class="text-success"> <strong class="text-dark">Pays:</strong> ${stateName}</span></span>
        <span class="population text-info"> <strong class="text-dark">Identifiant:</strong>  ${place.identifier}</span>
        <span class="population "> <strong class="text-dark">Description:</strong>  ${place.Description}</span>
        <a href="#" class="population  btn btn-secondary my-3">${place.website}</a>
      </li>

      <div class="col-lg-6">
      <div
        class="member d-flex align-items-start"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <div class="pic">
          <img
            src="${place.logo}"
            class="img-fluid"
            alt=""
          />
        </div>
        <div class="member-info">
          <h4>Walter White</h4>
          <span>Chief Executive Officer</span>
          <p>
            Explicabo voluptatem mollitia et repellat qui dolorum quasi
          </p>
          <div class="social">
            <a href=""><i class="ri-twitter-fill"></i></a>
            <a href=""><i class="ri-facebook-fill"></i></a>
            <a href=""><i class="ri-instagram-fill"></i></a>
            <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
          </div>
        </div>
      </div>
    </div>
    `;
  }).join('');
  
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search-input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

