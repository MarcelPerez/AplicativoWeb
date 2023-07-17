function confirmarUsuario() {
  username = document.getElementById("usuarioForget").value;
  ObtenerInfo("Usuario").then((response) =>
    comprobarUsuario(response, username)
  );
}

function nuevoUsuario() {
  document.getElementById("lblQuestion1").innerHTML = "";
  document.getElementById("lblQuestion2").innerHTML = "";
  document.getElementById("lblQuestion3").innerHTML = "";

  document.getElementById("question1").setAttribute("disabled", "");
  document.getElementById("question2").setAttribute("disabled", "");
  document.getElementById("question3").setAttribute("disabled", "");
  document.getElementById("usuarioForget").removeAttribute("disabled");
}

function comprobarUsuario(users, user) {
  let aux = false;
  let i = 0;
  while (!aux && i < Object.keys(users).length) {
    if (user == users[i].username) {
      aux = true;
      alertCorrect(
        "Usuario Encontrado",
        "Usuario: " + users[i].nombre1 + " " + users[i].apellido1 + "."
      );

      getPreguntasSeguridad(users[i]);
      i = Object.keys(users).length + 1;
    }
    i++;
    if (i == Object.keys(users).length && !aux) {
      alertError(
        "Usuario no Encontrado",
        "El usuario que ingreso no aparece en el sistema."
      );
    }
  }
}

function getPreguntasSeguridad(usuario) {
  document.getElementById("lblQuestion1").innerHTML =
    usuario.preguntaSeguridad1;
  document.getElementById("lblQuestion2").innerHTML =
    usuario.preguntaSeguridad2;
  document.getElementById("lblQuestion3").innerHTML =
    usuario.preguntaSeguridad3;
  localStorage.setItem(
    "respuestaPregunta1",
    usuario.respuestaPreguntaSeguridad1
  );
  localStorage.setItem(
    "respuestaPregunta2",
    usuario.respuestaPreguntaSeguridad2
  );

  localStorage.setItem(
    "respuestaPregunta3",
    usuario.respuestaPreguntaSeguridad3
  );

  localStorage.setItem("IdUsuario", usuario.idUsuario);
  alert(localStorage.getItem("IdUsuario"));

  document.getElementById("question1").removeAttribute("disabled");
  document.getElementById("question2").removeAttribute("disabled");
  document.getElementById("question3").removeAttribute("disabled");
  document.getElementById("usuarioForget").setAttribute("disabled", "");
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
  pregunta1 = document.getElementById("question1").value;
  pregunta2 = document.getElementById("question2").value;
  pregunta3 = document.getElementById("question3").value;

  if (
    localStorage.getItem("respuestaPregunta1") == pregunta1 &&
    localStorage.getItem("respuestaPregunta2") == pregunta2 &&
    localStorage.getItem("respuestaPregunta3") == pregunta3
  ) {
    alertCorrect("Respuestas Correctas", "Ahora Ingrese su nueva contraseña");
    cambiarNuevaPassword();
    // localStorage.clear();
  } else {
    alertError(
      "Respuestas de las preguntas de seguridad erroneas",
      "Ingrese las respuestas correctamente."
    );
  }
}

function cambiarNuevaPassword() {
  document.getElementById("security-questions").style.display = "none";
  document.getElementById("nuevaPasswordGroup").style.display = "block";
  document.getElementById("checkUser").style.display = "none";
}

function establecerNuevaPassword() {
  pass1 = document.getElementById("newPassword").value;
  pass2 = document.getElementById("newPassword2").value;
  if (pass1 == pass2) {
    ObtenerInfo("Usuario/" + localStorage.getItem("IdUsuario")).then(
      (usuario) => establecerNuevaPassword2(usuario, pass1)
    );
  } else {
    alertError(
      "Las Contraseñas no coinciden",
      "Ingresa la misma contraseña en ambos campos."
    );
  }
}

function establecerNuevaPassword2(usuario, pass) {
  const datos = {
    idUsuario: usuario.idUsuario,
    nombre1: usuario.nombre1,
    nombre2: usuario.nombre1,
    apellido1: usuario.apellido1,
    apellido2: usuario.apellido2,
    tipoUsuario: usuario.tipoUsuario,
    username: usuario.username,
    password: encriptarConSHA256(pass),
    preguntaSeguridad1: usuario.preguntaSeguridad1,
    respuestaPreguntaSeguridad1: usuario.respuestaPreguntaSeguridad1,
    preguntaSeguridad2: usuario.preguntaSeguridad2,
    respuestaPreguntaSeguridad2: usuario.respuestaPreguntaSeguridad2,
    preguntaSeguridad3: usuario.preguntaSeguridad3,
    respuestaPreguntaSeguridad3: usuario.respuestaPreguntaSeguridad3,
  };
  console.log(datos);


  fetch("http://154.38.167.248:5024/api/Usuario", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => {
      if (!response.ok) {
        alertError(
          "ERROR ACTUALIZANDO LA CONTRASEÑA DEL USUARIO",
          "Hubo un problema al guardar el usuario."
        );
      } else {
        alertCorrectTrue(
          "Contraseña se cambio correctamente correctamente",
          "La nueva contraseña del usuario se guardó correctamente."
        );
      }
    })
    .catch((error) => alert(error.message));
}

function cancelarNuevaPassword() {
  window.location = "";
}
