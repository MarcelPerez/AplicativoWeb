function fillTable(IdEstacion, tablaId) {
  const tabla = document.getElementById(tablaId);
  const tbody = tabla.getElementsByTagName("tbody")[0];

  fetch(
    "http://154.38.167.248:5024/api/Detalle_Medicion/LastMedicionEstacion/" +
      IdEstacion
  )
    .then((response) => response.json())
    .then((medicion) => {
      // Iterar sobre las estaciones y agregar una fila por cada una
      medicion.forEach((medicion) => {
        const fila = tbody.insertRow();

        const Estacion = fila.insertCell();
        Estacion.innerText = medicion.nombreEstacion;

        const nombreQuimico = fila.insertCell();
        nombreQuimico.innerText = medicion.nombreQuimico;

        const fecha = fila.insertCell();
        fecha.innerText = formatDate(medicion.time, 1);

        const hora = fila.insertCell();
        hora.innerText = formatDate(medicion.time, 2);

        const valor = fila.insertCell();
        valor.innerText = medicion.valor;

        const maximo = fila.insertCell();
        maximo.innerText = medicion.threasureHigh;

        const minimo = fila.insertCell();
        minimo.innerText = medicion.threasureLow;

        const estado = fila.insertCell();
        if (
          medicion.valor > medicion.threasureLow &&
          medicion.valor < medicion.threasureHigh
        ) {
          estado.innerText = "Bien";
        } else {
          estado.innerText = "Mal";
        }
      });
    })
    .catch((error) => console.error("Error al obtener las estaciones:", error));
}
function formatDate(inputDate, opcion) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  if (opcion == 1) {
    return `${day}-${month}-${year}`;
  } else {
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }
}

fillTable(1, "tablaMedicionesEstacion1");
fillTable(2, "tablaMedicionesEstacion2");
fillTable(3, "tablaMedicionesEstacion3");
fillTable(4, "tablaMedicionesEstacion4");
fillTable(5, "tablaMedicionesEstacion5");
fillTable(6, "tablaMedicionesEstacion6");
fillTable(7, "tablaMedicionesEstacion7");
fillTable(8, "tablaMedicionesEstacion8");

tabla1 = document.getElementById("tablaMedicionesEstacion1");
tabla2 = document.getElementById("tablaMedicionesEstacion2");
tabla3 = document.getElementById("tablaMedicionesEstacion3");
tabla4 = document.getElementById("tablaMedicionesEstacion4");
tabla5 = document.getElementById("tablaMedicionesEstacion5");
tabla6 = document.getElementById("tablaMedicionesEstacion6");
tabla7 = document.getElementById("tablaMedicionesEstacion7");
tabla8 = document.getElementById("tablaMedicionesEstacion8");

tabla1.style.display = "none";
tabla2.style.display = "none";
tabla3.style.display = "none";
tabla4.style.display = "none";
tabla5.style.display = "none";
tabla6.style.display = "none";
tabla7.style.display = "none";
tabla8.style.display = "none";

botonAceptar = document.getElementById("btnAceptar");
detalle = document.getElementById("selectOption");

estacionCapilla = document.getElementById("estacion1");
estacionBiblioteca = document.getElementById("estacion2");
estacionLaboratorio = document.getElementById("estacion3");
estacionKiosko = document.getElementById("estacion4");
estacionPadreArroyo = document.getElementById("estacion5");
estacionAulasA4 = document.getElementById("estacion6");
estacionParqueoGeneral = document.getElementById("estacion7");
estacionJuan23 = document.getElementById("estacion8");

botonAceptar.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "inline";
  estacionBiblioteca.style.display = "inline";
  estacionLaboratorio.style.display = "inline";
  estacionKiosko.style.display = "inline";
  estacionPadreArroyo.style.display = "inline";
  estacionAulasA4.style.display = "inline";
  estacionParqueoGeneral.style.display = "inline";
  estacionJuan23.style.display = "inline";
  botonAceptar.style.display = "none";
  detalle.style.display = "block";
});

estacionCapilla.addEventListener("click", () => {
  tabla1.style.display = "block";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionBiblioteca.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "block";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionLaboratorio.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "block";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionKiosko.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "block";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionPadreArroyo.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "block";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionAulasA4.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "block";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionParqueoGeneral.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "block";
  tabla8.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

estacionJuan23.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "block";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});
