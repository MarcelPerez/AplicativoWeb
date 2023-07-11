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

function loginIncorrecto() {
  const alertBox = document.getElementById("alertBox");
  const closeAlertButton = document.getElementById("closeAlert");

  alertBox.style.display = "flex";

  closeAlertButton.addEventListener("click", function () {
    alertBox.style.display = "none";
  });
}

function loginCorrecto() {
  const alertBox = document.getElementById("alertBoxCorrect");
  const closeAlertButton = document.getElementById("closeAlertCorrect");

  alertBox.style.display = "flex";

  closeAlertButton.addEventListener("click", function () {
    alertBox.style.display = "none";
  });
}

function login(response) {
  var username, password;
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  let aux = false;
  let i = 0;
  while (!aux && i < Object.keys(response).length) {
    if (username == response[i].username && password == response[i].password) {
      aux = true;
      localStorage.setItem(
        "usuario",
        response[i].nombre1 + " " + response[i].apellido1
      );
      localStorage.setItem("tipoUsuario", response[i].tipoUsuario);
      loginCorrecto();
      const acceptAlertButton = document.getElementById("closeAlertCorrect");
      acceptAlertButton.addEventListener("click", function () {
        window.location = "./../sistema/";
        i = 0;
      });
    }
    i++;
    if (i == Object.keys(response).length && !aux) {
      loginIncorrecto();
    }
  }
}

const ObtenerInfo = async (opcion) => {
  const urlAPI = "http://154.38.167.248:5024/api/";
  const consulta = `${urlAPI}${opcion}`;
  try {
    const response = await fetch(consulta, { cache: "no-cache" });
    if (response.ok) {
      jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

function initial() {
  ObtenerInfo("Usuario")
    .then((response) => (Estacion = response))
    .then((response) => login(response));
}

function salir() {
  window.location = "../";
}

function showForgetPasswordForm() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("olvideCredencial").style.display = "flex";
}

function goBackToLoginForm() {
  document.getElementById("login-container").style.display = "block";
  document.getElementById("olvideCredencial").style.display = "none";
}

function checkSecurityAnswers() {
  // Aquí puedes agregar la lógica para verificar las respuestas de seguridad
  // Si las respuestas son correctas, redirige al formulario de cambio de contraseña
  // Si las respuestas son incorrectas, muestra un mensaje de error o realiza alguna acción
}

function registrarme() {
  const formLogin = document.getElementById("login-container");
  const formRegistrarme = document.getElementById("containerRegistro");
  formLogin.style.display = "none";
  formRegistrarme.style.display = "flex";
}

function anterior(opcion) {
  const formLogin = document.getElementById("login-container");
  const formRegistrarme = document.getElementById("containerRegistro");
  const formRegistrarme2 = document.getElementById("containerRegistro2");
  const formRegistrarme3 = document.getElementById("containerRegistro3");

  // formLogin.style.display = "none";
  // formRegistrarme.style.display = "flex";
  //Registrar - P1:
  if (opcion == 1) {
    formLogin.style.display = "block";
    formRegistrarme.style.display = "none";
    formRegistrarme2.style.display = "none";
    formRegistrarme3.style.display = "none";
  }

  //Registrar - P2:
  if (opcion == 2) {
    formLogin.style.display = "none";
    formRegistrarme.style.display = "flex";
    formRegistrarme2.style.display = "none";
    formRegistrarme3.style.display = "none";
  }

  if (opcion == 3) {
    formLogin.style.display = "none";
    formRegistrarme.style.display = "none";
    formRegistrarme2.style.display = "flex";
    formRegistrarme3.style.display = "none";
  }
}

function siguiente(opcion) {
  const formLogin = document.getElementById("login-container");
  const formRegistrarme = document.getElementById("containerRegistro");
  const formRegistrarme2 = document.getElementById("containerRegistro2");
  const formRegistrarme3 = document.getElementById("containerRegistro3");

  //Registrar - P1:
  if (opcion == 1) {
    formLogin.style.display = "none";
    formRegistrarme.style.display = "none";
    formRegistrarme2.style.display = "flex";
    formRegistrarme3.style.display = "none";

  }

  if(opcion==2){
    formLogin.style.display = "none";
    formRegistrarme.style.display = "none";
    formRegistrarme2.style.display = "none";
    formRegistrarme3.style.display = "flex";
  }
}
