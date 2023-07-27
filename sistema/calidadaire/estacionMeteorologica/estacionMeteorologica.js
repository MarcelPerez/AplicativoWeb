fetch(
  "https://api.weatherapi.com/v1/forecast.json?q=19.445%2C%20-70.6828&days=14&aqi=yes&key=4f453a456523413782a123513231907"
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    console.log(response.location);
    console.log(response.current);
    console.log(response.forecast.forecastday[0]);
    console.log(response.forecast.forecastday[0].astro);
    console.log(response.forecast.forecastday[0].day);
    console.log(response.forecast.forecastday[0].hour);
    console.log(response.forecast.forecastday[0].hour[23]);
    document.getElementById("nombreEstacion").textContent =
      "Weatherapi - " + response.location.name;
    document.getElementById("measurement-date").textContent =
      response.location.localtime;
    document.getElementById("last-measurement").textContent =
      response.current.last_updated;
    document.getElementById("temperature-c").textContent =
      response.current.temp_c;
    document.getElementById("temperature-f").textContent =
      response.current.temp_f;
    document.getElementById("humidity").textContent = response.current.humidity;
    document.getElementById("day-night").textContent = response.current.is_day;
    document.getElementById("condition").textContent =
      response.current.condition.text;
    document.getElementById("wind-speed-kph").textContent =
      response.current.wind_kph;
    document.getElementById("wind-speed-mph").textContent =
      response.current.wind_mph;
    document.getElementById("wind-deg").textContent =
      response.current.wind_degree;
    document.getElementById("wind-dir").textContent = response.current.wind_dir;
    document.getElementById("pressure-mb").textContent =
      response.current.pressure_in;
    document.getElementById("pressure-in").textContent =
      response.current.pressure_mb;
    document.getElementById("precipitation-mm").textContent =
      response.current.precip_mm;
    document.getElementById("precipitation-in").textContent =
      response.current.precip_in;
    document.getElementById("humidity-percent").textContent =
      response.current.humidity;
    document.getElementById("clouds-percent").textContent =
      response.current.cloud;
    document.getElementById("uv-index").textContent = response.current.uv;
    document.getElementById("wind-gust-mph").textContent =
      response.current.gust_mph;
    document.getElementById("wind-gust-kph").textContent =
      response.current.gust_kph;
    document.getElementById("visibility-km").textContent =
      response.current.vis_km;
    document.getElementById("visibility-miles").textContent =
      response.current.vis_miles;

    //CALIDAD AIRE:
    document.getElementById("co").textContent = response.current.air_quality.co;
    document.getElementById("no2").textContent =
      response.current.air_quality.no2;
    document.getElementById("o3").textContent = response.current.air_quality.o3;
    document.getElementById("so2").textContent =
      response.current.air_quality.so2;
    document.getElementById("pm25").textContent =
      response.current.air_quality.pm2_5;
    document.getElementById("pm10").textContent =
      response.current.air_quality.pm10;
    // document.getElementById("us-epa-index").textContent = response.current.air_quality.usepa-index;
    // document.getElementById("gb-defra-index").textContent = response.current.air_quality.gb-defra-index;

    document.getElementById("sunrise").textContent =
      response.forecast.forecastday[0].astro.sunrise;
    document.getElementById("sunset").textContent =
      response.forecast.forecastday[0].astro.sunset;
    document.getElementById("moonrise").textContent =
      response.forecast.forecastday[0].astro.moonrise;
    document.getElementById("moonset").textContent =
      response.forecast.forecastday[0].astro.moonset;
    document.getElementById("moonphase").textContent =
      response.forecast.forecastday[0].astro.moon_phase;
    document.getElementById("moon-illumination").textContent =
      response.forecast.forecastday[0].astro.moon_illumination;
    document.getElementById("moon-out").textContent =
      response.forecast.forecastday[0].astro.is_moon_up;
    const hourlyData = document.getElementById("hourly-data");
    hourlyData.innerHTML = "";
    for (let i = 0; i < response.forecast.forecastday[0].hour.length; i++) {
      const hourlyRow = `
            <tr>
                <td>${response.forecast.forecastday[0].hour[i].time}</td>
                <td>${response.forecast.forecastday[0].hour[i].temp_c}°C / ${response.forecast.forecastday[0].hour[i].temp_f}°F</td>
                <td>${response.forecast.forecastday[0].hour[i].feelslike_c}°C / ${response.forecast.forecastday[0].hour[i].feelslike_f}°F</td>
                <td>${response.forecast.forecastday[0].hour[i].is_day}</td>
                <td>${response.forecast.forecastday[0].hour[i].condition.text}</td>
                <td>${response.forecast.forecastday[0].hour[i].wind_kph} km/h / ${response.forecast.forecastday[0].hour[i].wind_mph} mph</td>
                <td>${response.forecast.forecastday[0].hour[i].wind_degree}°</td>
                <td>${response.forecast.forecastday[0].hour[i].wind_dir}</td>
                <td>${response.forecast.forecastday[0].hour[i].pressure_mb} mb / ${response.forecast.forecastday[0].hour[i].pressure_in} in</td>
                <td>${response.forecast.forecastday[0].hour[i].precip_mm} mm / ${response.forecast.forecastday[0].hour[i].precip_in} in</td>
            </tr>
        `;
      hourlyData.insertAdjacentHTML("beforeend", hourlyRow);
    }
  });

// Escuchar el envío del formulario de pronóstico
document
  .getElementById("forecast-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const days = parseInt(document.getElementById("days").value, 10);
    generateForecast(days);
  });
