const url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7678efb41cmsh6d84ee53879e69cp196b95jsn6ba709787b15",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
const cities = ["shanghai", "lucknow", "boston", "kolkata", "chennai"];

async function getWeather(city) {
  try {
    const response = await fetch(url + city, options);
    const result = await response.json();
    console.log(result);
    cityName.innerHTML = city;
    document.getElementById("temp").innerHTML = result.temp;
    document.getElementById("temp2").innerHTML = result.temp;
    cloud_pct.innerHTML = result.cloud_pct;
    feels_like.innerHTML = result.feels_like;
    humidity.innerHTML = result.humidity;
    humidity2.innerHTML = result.humidity;
    min_temp.innerHTML = result.min_temp;
    max_temp.innerHTML = result.max_temp;
    wind_speed.innerHTML = result.wind_speed;
    wind_speed2.innerHTML = result.wind_speed;
    //wind_degree.innerHTML = result.wind_degree
    sunrise.innerHTML = result.sunrise;
    sunset.innerHTML = result.sunset;
  } catch (error) {
    console.error(error);
  }
}

getWeather("delhi");

async function getWeathers(cities) {
  const fetchPromises = cities.map((city) =>
    fetch(url + city, options).then((response) => response.json())
  );
  const results = await Promise.all(fetchPromises);

  const rows = results.map((result, index) => {
    const valuesArray = [
      result.cloud_pct,
      result.feels_like,
      result.humidity,
      result.max_temp,
      result.min_temp,
      result.sunrise,
      result.sunset,
      result.temp,
      result.wind_degrees,
      result.wind_speed,
    ];

    const row = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.textContent = `${cities[index]}`;
    row.appendChild(th);

    for (const value of valuesArray) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }

    return row;
  });

  for (const row of rows) {
    tableBody.appendChild(row);
  }
}

getWeathers(cities);

Submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

Submit.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (e.key == "Enter") {
    getWeather(city.value);
  }
});
