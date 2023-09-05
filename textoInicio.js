const textoArray = [
  "Sala para cocteles ambientada",
  "Prueba nuestra experiencia Street Food",
  "Ahora reparto a domicilio!",
];
let currentIndex = 0;

function cambiarTexto() {
  currentIndex = (currentIndex + 1) % textoArray.length;
  document.getElementById("parpadeoTexto").textContent =
    textoArray[currentIndex];
}

setInterval(cambiarTexto, 3000);
