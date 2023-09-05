const parpadeoImg = document.getElementById("parpadeoImg");
const textMask = document.querySelector(".text-mask");

function iniciarParpadeo() {
    setTimeout(function () {
    parpadeoImg.style.animation = "none";
    textMask.style.animation = "none";
    }, 11000);
}
// Iniciar el parpadeo cuando se carga la página
window.onload = iniciarParpadeo;
