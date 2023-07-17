function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var meridiem = hours >= 12 ? "PM" : "AM";

    // Convertir las horas al formato de 12 horas
    hours = hours % 12 || 12;

    // Agregar un cero delante de los números si son menores a 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Actualizar el contenido de los elementos del reloj
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("meridiem").textContent = meridiem;
  }

  // Actualizar el reloj cada segundo
  setInterval(updateClock, 1000);