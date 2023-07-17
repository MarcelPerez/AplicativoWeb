function llenarPreguntasSeguridad() {
  const selectPreguntaSeguridad = document.getElementById(
    "pregunta-seguridad-1"
  );
  const selectPreguntaSeguridad2 = document.getElementById(
    "pregunta-seguridad-2"
  );
  const selectPreguntaSeguridad3 = document.getElementById(
    "pregunta-seguridad-3"
  );
  fetch("http://154.38.167.248:5024/api/PreguntaSeguridad") // Reemplaza 'URL_DE_TU_API' con la URL de tu API
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pregunta) => {
        const option = document.createElement("option");
        option.value = pregunta.id; // Reemplaza 'id' con el nombre de la propiedad que contiene el valor de la pregunta en tu objeto de datos
        option.text = pregunta.pregunta; // Reemplaza 'texto' con el nombre de la propiedad que contiene el texto de la pregunta en tu objeto de datos
        selectPreguntaSeguridad.appendChild(option);
        selectPreguntaSeguridad2.appendChild(option.cloneNode(true));
        selectPreguntaSeguridad3.appendChild(option.cloneNode(true));
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

llenarPreguntasSeguridad();
