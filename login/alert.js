function alertError(data, details) {
  const alertBox = document.getElementById("alertBox");
  const closeAlertButton = document.getElementById("closeAlert");

  alertBox.style.display = "flex";

  document.getElementById("message").innerHTML = data;
  document.getElementById("usuarioCorrect").innerHTML = details;

  closeAlertButton.addEventListener("click", function () {
    alertBox.style.display = "none";
  });
}

function alertCorrect(data, details) {
  const alertBox = document.getElementById("alertBoxCorrect");
  const closeAlertButton = document.getElementById("closeAlertCorrect");

  alertBox.style.display = "flex";

  document.getElementById("messageCorrect").innerHTML = data;

  var usuarioCorrect = document.getElementById("usuarioCorrecto");
  usuarioCorrect.innerHTML = details;

  closeAlertButton.addEventListener("click", function () {
    alertBox.style.display = "none";
  });
}

function alertCorrectTrue(data, details) {
  const alertBox = document.getElementById("alertBoxCorrect");
  const closeAlertButton = document.getElementById("closeAlertCorrect");

  alertBox.style.display = "flex";

  document.getElementById("messageCorrect").innerHTML = data;

  var usuarioCorrect = document.getElementById("usuarioCorrecto");
  usuarioCorrect.innerHTML = details;

  closeAlertButton.addEventListener("click", function () {
    location.reload();
  });
}
