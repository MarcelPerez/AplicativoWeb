const preguntaSeguridad1 = document.getElementById("pregunta-seguridad-1");
const respuestaPreguntaSeguridad1 = document.getElementById(
  "respuesta-pregunta-1"
);
const preguntaSeguridad2 = document.getElementById("pregunta-seguridad-2");
const respuestaPreguntaSeguridad2 = document.getElementById(
  "respuesta-pregunta-2"
);
const preguntaSeguridad3 = document.getElementById("pregunta-seguridad-3");
const respuestaPreguntaSeguridad3 = document.getElementById(
  "respuesta-pregunta-3"
);

function changePreguntaSeguridad(option) {
  if (option == 2) {
    respuestaPreguntaSeguridad1.removeAttribute("disabled");
    preguntaSeguridad2.removeAttribute("disabled");
  }
  if (option == 3) {
    respuestaPreguntaSeguridad2.removeAttribute("disabled");
    preguntaSeguridad3.removeAttribute("disabled");
  }
  if (option == 4) {
    respuestaPreguntaSeguridad3.removeAttribute("disabled");
  }

}
