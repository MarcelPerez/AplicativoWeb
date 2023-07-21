function registrarUsuario() {
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
  alert(tipoUsuario);

  const password = document.getElementById("contrasena").value;
  if (username.length > 0 && checkpassword(password)) {
    ObtenerInfo("Usuario").then((response) => checkUser(response, username));
  } else {
    alertError(
      "Error ingresando usuario",
      "Debes tener una contraseña con al menos 1 letra, 1 número, 6 digitos mínimo y sin espacios en blanco."
    );
  }
}

function checkUser(response, username) {
  let i = 1;
  const users = response.length;
  response.map((usuario) => {
    if (username == usuario.username) {
      alertError("Error Creando el Usuario", "Este usuario ya existe.");
      i = users + 1;
    } else if (i == users) {
      ingresarUsuario();
    } else {
      i++;
    }
  });
}

function checkpassword(pass) {
  // Comprobar la longitud mínima
  if (pass.length < 6) {
    return false;
  }

  // Comprobar si contiene al menos una letra y un número
  var tieneLetra = false;
  var tieneNumero = false;

  for (var i = 0; i < pass.length; i++) {
    var caracter = pass.charAt(i);

    if (isNaN(caracter)) {
      tieneLetra = true;
    } else {
      tieneNumero = true;
    }

    // Salir del bucle si ya se encontró una letra y un número
    if (tieneLetra && tieneNumero) {
      break;
    }
  }

  if (!tieneLetra || !tieneNumero) {
    return false;
  }

  // Comprobar si contiene espacios en blanco
  if (pass.indexOf(" ") !== -1) {
    return false;
  }

  // Si se cumplieron todas las condiciones, la contraseña es válida
  return true;
}

function ingresarUsuario() {
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

  const password = document.getElementById("contrasena").value;
  const datos = {
    nombre1: primerNombre,
    nombre2: segundoNombre,
    apellido1: primerApellido,
    apellido2: segundoApellido,
    tipoUsuario: tipoUsuario,
    username: username,
    password: encriptarConSHA256(password),
    preguntaSeguridad1: preguntaSeguridad1,
    respuestaPreguntaSeguridad1: respuestaPreguntaSeguridad1,
    preguntaSeguridad2: preguntaSeguridad2,
    respuestaPreguntaSeguridad2: respuestaPreguntaSeguridad2,
    preguntaSeguridad3: preguntaSeguridad3,
    respuestaPreguntaSeguridad3: respuestaPreguntaSeguridad3,
  };
  fetch("http://154.38.167.248:5024/api/Usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => {
      if (!response.ok) {
        alertError(
          "ERROR GUARDANDO USUARIO",
          "Hubo un problema al guardar el usuario."
        );
      } else {
        alertCorrectTrue(
          "Usuario guardado correctamente",
          "El usuario se guardó correctamente."
        );
      }
    })
    .catch((error) => alert(error.message));
}

function limpiarFormulario() {
  document.getElementById("registro-form3").reset();
}
