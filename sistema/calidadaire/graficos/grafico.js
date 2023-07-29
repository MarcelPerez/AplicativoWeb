//GENERALES:
volver = document.getElementById("back");
aceptar = document.getElementById("btnAceptar");

//Botones:
detalle = document.getElementById("selectOption");
estacionCapilla = document.getElementById("estacion1");
estacionBiblioteca = document.getElementById("estacion2");
estacionLaboratorio = document.getElementById("estacion3");
estacionKiosko = document.getElementById("estacion4");
estacionPadreArroyo = document.getElementById("estacion5");
estacionAulasA4 = document.getElementById("estacion6");
estacionParqueoGeneral = document.getElementById("estacion7");
estacionJuan23 = document.getElementById("estacion8");

// Quimicos:
detalle2 = document.getElementById("selectOptionQuimico");
polvo = document.getElementById("quimico1");
CO = document.getElementById("quimico2");
NO2 = document.getElementById("quimico3");
VOC = document.getElementById("quimico4");
C2H5CH = document.getElementById("quimico5");
CO2 = document.getElementById("quimico6");
TEMP = document.getElementById("quimico7");
HUM = document.getElementById("quimico8");

// Agregar eventos click a cada botón:
estacionCapilla.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 1);
  getQuimicos();
});

estacionBiblioteca.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 2);
  getQuimicos();
});
estacionLaboratorio.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 3);
  getQuimicos();
});
estacionKiosko.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 4);
  getQuimicos();
});
estacionPadreArroyo.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 5);
  getQuimicos();
});
estacionAulasA4.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 6);
  getQuimicos();
});
estacionParqueoGeneral.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 7);
  getQuimicos();
});
estacionJuan23.addEventListener("click", () => {
  localStorage.setItem("EstacionGrafica", 8);
  getQuimicos();
});

volver.addEventListener("click", () => {
  getEstaciones();
});

polvo.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 1);
  getChart();
});
CO.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 2);
  getChart();
});
NO2.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 3);
  getChart();
});
VOC.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 4);
  getChart();
});
C2H5CH.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 5);
  getChart();
});
CO2.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 6);
  getChart();
});

TEMP.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 7);
  getChart();
});
HUM.addEventListener("click", () => {
  localStorage.setItem("QuimicoGrafica", 8);
  getChart();
});

aceptar.addEventListener("click", () => {
  window.location = "";
});

function getQuimicos() {
  //GRLS:
  volver.style.display = "block";
  // Estaciones:
  detalle.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";

  // Quimicos:
  detalle2.style.display = "block";
  polvo.style.display = "inline";
  CO.style.display = "inline";
  NO2.style.display = "inline";
  VOC.style.display = "inline";
  C2H5CH.style.display = "inline";
  CO2.style.display = "inline";
  TEMP.style.display = "inline";
  HUM.style.display = "inline";
}

function getEstaciones() {
  //GRLS:
  volver.style.display = "none";
  // Estaciones:
  detalle.style.display = "block";
  estacionCapilla.style.display = "inline";
  estacionBiblioteca.style.display = "inline";
  estacionLaboratorio.style.display = "inline";
  estacionKiosko.style.display = "inline";
  estacionPadreArroyo.style.display = "inline";
  estacionAulasA4.style.display = "inline";
  estacionParqueoGeneral.style.display = "inline";
  estacionJuan23.style.display = "inline";

  // Quimicos:
  detalle2.style.display = "none";
  polvo.style.display = "none";
  CO.style.display = "none";
  NO2.style.display = "none";
  VOC.style.display = "none";
  C2H5CH.style.display = "none";
  CO2.style.display = "none";
  TEMP.style.display = "none";
  HUM.style.display = "none";
}

function getChart() {
  hideBotons();
  const ctx = document.getElementById("myChart");
  ctx.style.display = "block";
  dataNombre = [];
  dataValue = [];
  nombreQuimico = "";
  nombreEstacion = "";
  fetch(
    "http://154.38.167.248:5024/api/detalle_Medicion/estacion/" +
      localStorage.getItem("EstacionGrafica") +
      "/" +
      localStorage.getItem("QuimicoGrafica")
  )
    .then((response) => response.json())
    .then((response) => {
      nombreEstacion = response[0].nombreEstacion;
      nombreQuimico = response[0].nombreQuimico;
      response.forEach((medicion) => {
        dataNombre.push(convertirFechaCompleta(medicion.time));
        dataValue.push(medicion.valor);
      });
    })
    .then((response) => {
      console.log(nombreQuimico);
      // console.log(dataValue);
      const opciones = {
        title: {
          display: true,
          text: "Mi Gráfico con Título",
          fontSize: 20,
          fontColor: "#333", // Color del texto del título
        },
      };
      const myChart = new Chart(ctx, {
        type: "bar",
        options: {
          plugins: {
            legend: {
              position: "top",
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
            },

            title: {
              display: true,
              text: "Estación " + nombreEstacion,
            },
          },
        },
        data: {
          labels: dataNombre,
          datasets: [
            {
              label: nombreQuimico,
              data: dataValue,
              backgroundColor: [
                "rgba(255,99,132,0.2)",
                "rgba(54,162,235,0.2)",
                "rgba(255,206,86,0.2)",
                "rgba(153,102,255,0.2)",
                "rgba(255,159,64,0.2)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54,162,235,1)",
                "rgba(255,206,86,1)",
                "rgba(153,102,255,1)",
                "rgba(255,159,64,1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
      });
    });
}

function hideBotons() {
  //GRLS:
  volver.style.display = "none";
  aceptar.style.display = "block";

  // Estaciones:
  detalle.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";

  // Quimicos:
  detalle2.style.display = "none";
  polvo.style.display = "none";
  CO.style.display = "none";
  NO2.style.display = "none";
  VOC.style.display = "none";
  C2H5CH.style.display = "none";
  CO2.style.display = "none";
  TEMP.style.display = "none";
  HUM.style.display = "none";
}

function convertirFechaCompleta(fechaString) {
  // Paso 1: Parsear la fecha a un objeto de fecha (Date)
  const fecha = new Date(fechaString);

  // Paso 2: Obtener el día, mes, año, horas y minutos
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString("default", { month: "long" });
  const año = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Paso 3: Convertir las horas a formato de 12 horas (AM/PM)
  let horas12 = horas % 12;
  horas12 = horas12 === 0 ? 12 : horas12; // Si es 0, se convierte a 12 para el formato de 12 horas
  const amPm = horas < 12 ? "AM" : "PM";

  // Paso 4: Construir la cadena con el formato "dd de Mes del yyyy - hh:mm AM/PM"
  const fechaCompleta = `${dia.toString().padStart(2, "0")} - ${mes} - ${año}`;

  return fechaCompleta;
}
