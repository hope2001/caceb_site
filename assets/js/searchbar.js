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
  var html 
   if(document.querySelector('.search-input').value == '')
   {
       html = ''
   }
   else
   {
    html = matchArray.map(place => {
    
        const regex = new RegExp(this.value, 'gi');
        const socity_name = place.socity.replace(regex, `<span class="highlight">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        
        return `
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
              <h4>${place.socity}</h4>
              <span>${place.identifier}</span>
              <p>
              ${place.Description}
              </p>
              
                <>${place.accr}
              
              
              </ul>
              
              <div class="social">
                <a href="${place.website}"><i class="ri-google-fill"></i></a>
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
   }

  
  if (html !== ''|| html == !null) {
    suggestions.innerHTML = html;
  } else {
    suggestions.innerHTML = 'Aucun résultat à afficher';
  }
  
  
}

const searchInput = document.querySelector('.search-input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

