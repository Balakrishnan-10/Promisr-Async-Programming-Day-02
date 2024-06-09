// Using function to create DOM elements:

function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

// creating a base (container, heading, row):

let container = element("div", "container", "", "");
const h1 = element(
  "h1",
  "text-center",
  "title",
  "Rest Contries Weather Details"
);
const row = element("div", "row", "", "");

// Fetch part (RestCountries API):

const res = fetch("https://restcountries.com/v3.1/all");
res
  .then((data) => data.json())
  .then((res1) => {
    // console.log(res1));

    // Allocating country details to the Boostrap-card:

    for (let i = 0; i < res1.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
    <div class = "card h-100">
    <div class = "card-header">
    <h5 class = "card-title text-center">${res1[i].name.common} </h5>
    </div>
    <div class = "img-box">
    <img src = "${res1[i].flags.svg}" class = "card-img-top" alt = "country Image" />
    </div>
    <div class = "card-body">
    <div class = "card-text text-center">Region : ${res1[i].region} </div> 
    <div class = "card-text text-center">Capital : ${res1[i].capital} </div>
    <div class = "card-text text-center">Country-Code : ${res1[i].cca3} </div>
    <button class = "btn btn-primary" > Click for Weather </button>
    </div>
    </div>
    `;
      row.append(col);
    }

    // Button logic for appending weather details from Weather API:

    let button = document.querySelectorAll("button"); // Select all buttton from the API
    // console.log(button);
    button.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // LatLng splitting for weather API

        let latlng = res1[index].latlng;
        let lat = latlng[0]; // console.log(lat);
        let lon = latlng[1]; // console.log(lon);

        // Weather API getting and updating the lat, lon, API key to the API

        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=704bff2a1b4664a90f6e9d3ac8462787`
        );
        weatherApi
          .then((data1) => data1.json())
          .then((res2) => {
            //console.log(res2)
            
            alert(`Weather of ${res1[index].name.common} is ${Math.floor(res2.main.temp)}°C`);
          });
      });
    });
  });
// Appendind Part:

container.append(row);
document.body.append(h1, container);
