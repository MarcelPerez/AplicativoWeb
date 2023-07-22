function login(response) {
  var username, password;
  username = document.getElementById("username").value;
  password = encriptarConSHA256(document.getElementById("password").value);

  let aux = false;
  let i = 0;
  while (!aux && i < Object.keys(response).length) {
    if (username == response[i].username && password == response[i].password) {
      aux = true;
      localStorage.setItem("idUsuario", response[i].idUsuario);
      localStorage.setItem(
        "usuario",
        response[i].nombre1 + " " + response[i].apellido1
      );
      localStorage.setItem("tipoUsuario", response[i].tipoUsuario);
      alertCorrect(
        "Contraseña Correcta",
        "Bienvenido al sistema " + localStorage.getItem("usuario")
      );
      const acceptAlertButton = document.getElementById("closeAlertCorrect");
      acceptAlertButton.addEventListener("click", function () {
        window.location = "./../sistema/";
        i = 0;
      });
    }
    i++;
    if (i == Object.keys(response).length && !aux) {
      alertError("Contraseña incorrecta!", "");
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
    // .then((response) => (Estacion = response))
    .then((response) => login(response));
}

function salir() {
  window.location = "../";
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

  const primerNombre = document.getElementById("primer-nombre").value;
  const segundoNombre = document.getElementById("segundo-nombre").value;
  const primerApellido = document.getElementById("primer-apellido").value;
  const segundoApellido = document.getElementById("segundo-apellido").value;
  const tipoUsuario = document.getElementById("tipo-usuario").value;
  const preguntaSeguridad1 = document.getElementById("pregunta-seguridad-1")
    .options[document.getElementById("pregunta-seguridad-1").selectedIndex]
    .text;
  const respuestaPreguntaSeguridad1 = document.getElementById(
    "respuesta-pregunta-1"
  ).value;
  const preguntaSeguridad2 = document.getElementById("pregunta-seguridad-2")
    .options[document.getElementById("pregunta-seguridad-2").selectedIndex]
    .text;
  const respuestaPreguntaSeguridad2 = document.getElementById(
    "respuesta-pregunta-2"
  ).value;
  const preguntaSeguridad3 = document.getElementById("pregunta-seguridad-3")
    .options[document.getElementById("pregunta-seguridad-3").selectedIndex]
    .text;
  const respuestaPreguntaSeguridad3 = document.getElementById(
    "respuesta-pregunta-3"
  ).value;
  const username = document.getElementById("usuario").value;

  const password = encriptarConSHA256(
    document.getElementById("contrasena").value
  );

  var errores = [];
  //Registrar - P1:
  if (opcion == 1) {
    if (primerNombre.length == 0) {
      errores.push("Primer Nombre");
    }
    if (primerApellido.length == 0) {
      errores.push("Primer Apellido");
    }
    if (segundoApellido.length == 0) {
      errores.push("Segundo Apellido");
    }
    if (tipoUsuario.length == 0) {
      errores.push("Tipo de Usuario");
    }

    if (errores.length == 0) {
      formLogin.style.display = "none";
      formRegistrarme.style.display = "none";
      formRegistrarme2.style.display = "flex";
      formRegistrarme3.style.display = "none";
    } else {
      let aux = "";
      errores.map((error) => {
        aux = aux + " " + error + ",";
      });
      alertError(
        "Completa todos los campos necesarios (*)",
        "<b>Restantes:</b> " + aux
      );
    }
  }

  if (opcion == 2) {
    if (respuestaPreguntaSeguridad1.length == 0) {
      errores.push("Primera Pregunta de Seguridad");
    }
    if (respuestaPreguntaSeguridad2.length == 0) {
      errores.push("Segunda Pregunta de Seguridad");
    }
    if (respuestaPreguntaSeguridad3.length == 0) {
      errores.push("Tercera Pregunta de Seguridad");
    }

    if (errores.length == 0) {
      formLogin.style.display = "none";
      formRegistrarme.style.display = "none";
      formRegistrarme2.style.display = "none";
      formRegistrarme3.style.display = "flex";
    } else {
      let aux = "";
      errores.map((error) => {
        aux = aux + " " + error + ",";
      });
      alertError(
        "Completa todos los campos necesarios (*)",
        "<b>Restantes:</b> " + aux
      );
    }
  }
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("contrasena");
  var toggleButton = document.getElementById("toggleButton");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Ocultar contraseña";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Mostrar contraseña";
  }
}
