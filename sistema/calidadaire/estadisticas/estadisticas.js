function fillTable(IdEstacion, tablaId) {
  const tabla = document.getElementById(tablaId);
  const tbody = tabla.getElementsByTagName("tbody")[0];

  fetch("http://154.38.167.248:5024/api/Estadistica/" + IdEstacion)
    .then((response) => response.json())
    .then((medicion) => {
      medicion.forEach((medicion) => {
        const fila = tbody.insertRow();

        const nombreQuimico = fila.insertCell();
        nombreQuimico.innerText = medicion.nombreQuimico;

        const cantidadMediciones = fila.insertCell();
        cantidadMediciones.innerText = medicion.cantidadMediciones;

        const valorMinimo = fila.insertCell();
        valorMinimo.innerText =
          medicion.valorMinimo.toFixed(2) +
          " " +
          obtenerUnidadesMedidas(medicion.nombreQuimico);

        const valorMaximo = fila.insertCell();
        valorMaximo.innerText =
          medicion.valorMaximo.toFixed(2) +
          " " +
          obtenerUnidadesMedidas(medicion.nombreQuimico);

        const mediaAritmetica = fila.insertCell();
        mediaAritmetica.innerText =
          medicion.mediaAritmetica.toFixed(2) +
          " " +
          obtenerUnidadesMedidas(medicion.nombreQuimico);

        const rango = fila.insertCell();
        rango.innerText = medicion.rango.toFixed(2);

        const desviacionEstandar = fila.insertCell();
        desviacionEstandar.innerText = medicion.desviacionEstandar.toFixed(2);

        const varianza = fila.insertCell();
        varianza.innerText = medicion.varianza.toFixed(2);
      });
    })
    .catch((error) => console.error("Error al obtener las mediciones:", error));
}

fillTable(1, "tablaEstadisticaEstacion1");
fillTable(2, "tablaEstadisticaEstacion2");
fillTable(3, "tablaEstadisticaEstacion3");
fillTable(4, "tablaEstadisticaEstacion4");
fillTable(5, "tablaEstadisticaEstacion5");
fillTable(6, "tablaEstadisticaEstacion6");
fillTable(7, "tablaEstadisticaEstacion7");
fillTable(8, "tablaEstadisticaEstacion8");
fillTable(11, "tablaEstadisticaEstacion11");

tabla1 = document.getElementById("tablaEstadisticaEstacion1");
tabla2 = document.getElementById("tablaEstadisticaEstacion2");
tabla3 = document.getElementById("tablaEstadisticaEstacion3");
tabla4 = document.getElementById("tablaEstadisticaEstacion4");
tabla5 = document.getElementById("tablaEstadisticaEstacion5");
tabla6 = document.getElementById("tablaEstadisticaEstacion6");
tabla7 = document.getElementById("tablaEstadisticaEstacion7");
tabla8 = document.getElementById("tablaEstadisticaEstacion8");
tabla11 = document.getElementById("tablaEstadisticaEstacion11");

tabla1.style.display = "none";
tabla2.style.display = "none";
tabla3.style.display = "none";
tabla4.style.display = "none";
tabla5.style.display = "none";
tabla6.style.display = "none";
tabla7.style.display = "none";
tabla8.style.display = "none";
tabla11.style.display = "none";

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
estacionMovil = document.getElementById("estacion11");

// detalle2 = document.getElementById("selectOption2");
// mediaMenu = document.getElementById("mediaMenu");
// desviacionMenu = document.getElementById("desviacionMenu");
// varianzaMenu = document.getElementById("varianzaMenu");

botonAceptar.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  tabla11.style.display = "none";
  estacionCapilla.style.display = "inline";
  estacionBiblioteca.style.display = "inline";
  estacionLaboratorio.style.display = "inline";
  estacionKiosko.style.display = "inline";
  estacionPadreArroyo.style.display = "inline";
  estacionAulasA4.style.display = "inline";
  estacionParqueoGeneral.style.display = "inline";
  estacionJuan23.style.display = "inline";
  estacionMovil.style.display = "inline";
  botonAceptar.style.display = "none";
  detalle.style.display = "block";
  // mediaMenu.style.display = "inline";
  // desviacionMenu.style.display = "inline";
  // varianzaMenu.style.display = "inline";
  // detalle2.style.display = "block";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
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
  tabla11.style.display = "none";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
  // mediaMenu.style.display = "none";
  // desviacionMenu.style.display = "none";
  // varianzaMenu.style.display = "none";
  // detalle2.style.display = "none";
});

estacionMovil.addEventListener("click", () => {
  tabla1.style.display = "none";
  tabla2.style.display = "none";
  tabla3.style.display = "none";
  tabla4.style.display = "none";
  tabla5.style.display = "none";
  tabla6.style.display = "none";
  tabla7.style.display = "none";
  tabla8.style.display = "none";
  tabla11.style.display = "block";
  estacionCapilla.style.display = "none";
  estacionBiblioteca.style.display = "none";
  estacionLaboratorio.style.display = "none";
  estacionKiosko.style.display = "none";
  estacionPadreArroyo.style.display = "none";
  estacionAulasA4.style.display = "none";
  estacionParqueoGeneral.style.display = "none";
  estacionJuan23.style.display = "none";
  estacionMovil.style.display = "none";
  botonAceptar.style.display = "block";
  detalle.style.display = "none";
});

