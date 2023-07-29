fetch(
  "https://api.weatherapi.com/v1/forecast.json?q=19.445%2C%20-70.6828&aqi=yes&key=4f453a456523413782a123513231907"
)
  .then((response) => response.json())
  .then((response) => {
    // console.log(response);
    
    document.getElementById("nombreEstacion").textContent =
      "Weatherapi - " + response.location.name;
    document.getElementById("measurement-date").textContent =
    convertirFechaCompleta(response.location.localtime);

    const actualData = document.getElementById("actual-data");
    const actualRow = `
            <tr>
                <td>${convertirFecha(response.current.last_updated)}</td>
                <td>${response.current.temp_c}°C</td>
                <td>${response.current.humidity}%</td>
                <td>${response.current.pressure_mb} mb</td>
                <td>${response.current.precip_mm} mm</td>
                <td>${response.current.wind_kph} km/h</td>
                <td>${response.current.uv}</td>
               </tr>
        `;
    actualData.insertAdjacentHTML("beforeend", actualRow);

    const airQuialityData = document.getElementById("airQuality-data");
    const airRow = `
            <tr>
                <td>${convertirFecha(response.current.last_updated)}</td>
                <td>${response.current.air_quality.co} μg/m3</td>
                <td>${response.current.air_quality.no2} μg/m3</td>
                <td>${response.current.air_quality.o3} μg/m3</td>
                <td>${response.current.air_quality.so2} μg/m3</td>
                <td>${response.current.air_quality.pm2_5} μg/m3</td>
                <td>${response.current.air_quality.pm10} μg/m3</td>
               </tr>
        `;
    airQuialityData.insertAdjacentHTML("beforeend", airRow);

    const astronomousData = document.getElementById("astronomous-data");
    const astronomousRow = `
            <tr>
                <td>${response.forecast.forecastday[0].astro.sunrise}</td>
                <td>${response.forecast.forecastday[0].astro.sunset}</td>
                <td>${response.forecast.forecastday[0].astro.moonrise}</td>
                <td>${response.forecast.forecastday[0].astro.moonset}</td>
                <td>${response.forecast.forecastday[0].astro.moon_illumination} %</td>
                <td>${response.forecast.forecastday[0].astro.moon_phase}</td>
               </tr>
        `;
    astronomousData.insertAdjacentHTML("beforeend", astronomousRow);

    const hourlyData = document.getElementById("hourly-data");
    hourlyData.innerHTML = "";
    for (let i = 0; i < response.forecast.forecastday[0].hour.length; i++) {
      const hourlyRow = `
            <tr>
                <td>${convertirFecha(
                  response.forecast.forecastday[0].hour[i].time
                )}</td>
                <td>${response.forecast.forecastday[0].hour[i].temp_c} °C</td>
                <td>${
                  response.forecast.forecastday[0].hour[i].feelslike_c
                } °C</td>
                <td>${response.forecast.forecastday[0].hour[i].humidity} %</td>
                <td>${response.forecast.forecastday[0].hour[i].wind_kph} km/h</td>
                <td>${
                  response.forecast.forecastday[0].hour[i].pressure_mb
                } mb</td>
                <td>${response.forecast.forecastday[0].hour[i].precip_mm} mm</td>
            </tr>
        `;
      hourlyData.insertAdjacentHTML("beforeend", hourlyRow);
    }

    const hourlyAirQualityData = document.getElementById("hourlyAirQuality-data");
      for (let i = 0; i < response.forecast.forecastday[0].hour.length; i++) {
        const hourlyAirRow = `
        <tr>
        <td>${convertirFecha(response.forecast.forecastday[0].hour[i].time)}</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.co} μg/m3</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.no2} μg/m3</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.o3} μg/m3</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.so2} μg/m3</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.pm2_5} μg/m3</td>
        <td>${response.forecast.forecastday[0].hour[i].air_quality.pm10} μg/m3</td>
       </tr>
        `;
        hourlyAirQualityData.insertAdjacentHTML("beforeend", hourlyAirRow);
      }
  });

function convertirFecha(fechaString) {
  // Paso 1: Parsear la fecha a un objeto de fecha (Date)
  const fecha = new Date(fechaString);

  // Paso 2: Obtener las horas y minutos
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Paso 3: Convertir las horas y minutos a formato de 12 horas (AM/PM)
  let horas12 = horas % 12;
  horas12 = horas12 === 0 ? 12 : horas12; // Si es 0, se convierte a 12 para el formato de 12 horas
  const amPm = horas < 12 ? "AM" : "PM";

  // Paso 4: Construir la cadena con el formato "hh:mm AM/PM"
  const horaMinutoAmPm = `${horas12.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")} ${amPm}`;

  return horaMinutoAmPm;
}


function convertirFechaCompleta(fechaString) {
  // Paso 1: Parsear la fecha a un objeto de fecha (Date)
  const fecha = new Date(fechaString);

  // Paso 2: Obtener el día, mes, año, horas y minutos
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('default', { month: 'long' });
  const año = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Paso 3: Convertir las horas a formato de 12 horas (AM/PM)
  let horas12 = horas % 12;
  horas12 = horas12 === 0 ? 12 : horas12; // Si es 0, se convierte a 12 para el formato de 12 horas
  const amPm = horas < 12 ? 'AM' : 'PM';

  // Paso 4: Construir la cadena con el formato "dd de Mes del yyyy - hh:mm AM/PM"
  const fechaCompleta = `${dia.toString().padStart(2, '0')} de ${mes} del ${año} - ${horas12.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')} ${amPm}`;

  return fechaCompleta;
}