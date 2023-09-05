const textoArray = [
  "Sala de cocteles ambientada",
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
    mostrarBotonCarta();
  }, 15000);
}

function mostrarBotonCarta() {
  const botonCarta = document.getElementById("botonCarta");
  botonCarta.style.display = "block";
}

detenerParpadeoDespuesDe15Segundos();

function fadeIn(element) {
  let opacity = 0;
  element.style.display = "block";
  const intervalId = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(intervalId);
    } else {
      opacity += 0.02;
      element.style.opacity = opacity;
    }
  }, 20);
}

const botonCarta = document.getElementById("botonCarta");
botonCarta.addEventListener("click", () => {
  botonCarta.classList.toggle("neon-effect");
});

setTimeout(function () {
  fadeIn(botonCarta);
}, 14000);
