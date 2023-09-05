const textoArray = [
  "Sala para cocteles ambientada",
  "Prueba nuestra experiencia Street Food",
  "Reparto a domicilio!",
];
let currentIndex = 0;
let parpadeoInterval;

function cambiarTexto() {
  currentIndex = (currentIndex + 1) % textoArray.length;
  document.getElementById("parpadeoTexto").textContent =
    textoArray[currentIndex];
}

function iniciarParpadeo() {
  parpadeoInterval = setInterval(cambiarTexto, 3000);
}
function detenerParpadeoDespuesDe15Segundos() {
  iniciarParpadeo();
  setTimeout(function () {
    clearInterval(parpadeoInterval);
  }, 15000);
}

detenerParpadeoDespuesDe15Segundos();
