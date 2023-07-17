// Función para encriptar información con SHA-256
function encriptarConSHA256(data) {
  // Convierte el dato en una cadena de texto (si no lo es)
  const dataString = typeof data === "string" ? data : JSON.stringify(data);

  // Encripta el dato utilizando SHA-256
  const hash = CryptoJS.SHA256(dataString);

  // Convierte el hash en una cadena de texto hexadecimal
  const hashString = hash.toString(CryptoJS.enc.Hex);

  // Devuelve el hash encriptado
  return hashString;
}

// Ejemplo de uso
// const data = "angelo1234";
// const encryptedData = encriptarConSHA256(data);
// console.log(encryptedData); // Imprime el hash SHA-256 del dato
