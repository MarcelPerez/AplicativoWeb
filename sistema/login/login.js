function login(response) {
  var username, password;
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  let aux = false;
  let i = 0;
  while (!aux && i < Object.keys(response).length) {
    if (username == response[i].username && password == response[i].password) {
      alert("INICIASTE SESION");
      aux = true;
      window.location = "../";
    }
    i++;
    if (i == Object.keys(response).length) {
      alert("NO INICIASTE SESION");
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
