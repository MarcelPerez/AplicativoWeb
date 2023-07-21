// menusEstudianteProfesor = [
//   "login",
//   "tablero",
//   "estadoAire_Mapa",
//   "estadoAire_Graficos",
//   "estadoAire_Estadisticas",
//   "estadoAire_EstacionMeteorologica",
//   "Estacion_Ingresar",
//   "Estacion_Visualizar",
//   "Estacion_Modificar",
//   "Alertas_Visualizar",
//   "Quimicos_Insertar",
//   "Quimicos_Visualizar",
//   "Quimicos_Modificar",
//   "Usuarios_Insertar",
//   "Usuarios_Visualizar",
//   "Usuarios_Modificar",
//   "Usuarios_Eliminar",
//   "Mantenimiento_SubirData",
//   "Mantenimiento_ModificarAlertas",
//   "Seguridad_InsertarPreguntas",
//   "Seguridad_VisualizarPreguntas",
// ];

estacionInsertar = document.getElementById("estacionInsertar");
estacionModificar = document.getElementById("estacionModificar");
quimicoInsertar = document.getElementById("quimicosInsertar");
quimicoModificar = document.getElementById("quimicosModificar");
sensorInsertar = document.getElementById("sensoresInsertar");
sensorModificar = document.getElementById("sensoresModificar");

usuarioMenu = document.getElementById("usuarioMenu");
mantenimientoMenu = document.getElementById("mantenimientoMenu");
seguridadMenu = document.getElementById("seguridadMenu");

if (
  localStorage.getItem("tipoUsuario") === "Estudiante" ||
  localStorage.getItem("tipoUsuario") === "Profesor"
) {
  estacionInsertar.style.display = "none";
  estacionModificar.style.display = "none";
  quimicoInsertar.style.display = "none";
  quimicoModificar.style.display = "none";
  sensorInsertar.style.display = "none";
  sensorModificar.style.display = "none";
  usuarioMenu.style.display = "none";
  mantenimientoMenu.style.display = "none";
  seguridadMenu.style.display = "none";
} else if (localStorage.getItem("tipoUsuario") === "Soporte") {
  usuarioMenu.style.display = "none";
  mantenimientoMenu.style.display = "none";
  seguridadMenu.style.display = "none";
} else {
  // ACCESO TOTAL
}


