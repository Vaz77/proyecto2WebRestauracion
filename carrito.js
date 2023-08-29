// Array para almacenar los platos seleccionados en el carrito
const carrito = [];
// Función para agregar un plato al carrito
function agregarAlCarrito(nombre, precio) {
  const plato = {
    nombre,
    precio,
    cantidad: 1,
  };
  // Verificar si el plato ya está en el carrito
  const platoExistente = carrito.find((item) => item.nombre === nombre);
  if (platoExistente) {
    platoExistente.cantidad++;
  } else {
    carrito.push(plato);
  }
  // Actualizar la interfaz de usuario
  mostrarCarrito();
}
// Función para quitar un plato del carrito
function quitarDelCarrito(nombre) {
  const platoExistente = carrito.find((item) => item.nombre === nombre);
  if (platoExistente) {
    platoExistente.cantidad--;
    if (platoExistente.cantidad === 0) {
      const index = carrito.indexOf(platoExistente);
      if (index > -1) {
        carrito.splice(index, 1);
      }
    }
    mostrarCarrito();
  }
}
// Función para mostrar el contenido del carrito en la página
function mostrarCarrito() {
  const carritoContainer = document.querySelector(
    "#carrito-modal .modal-body .list-group"
  );
  const carritoCount = document.getElementById("carrito-count");
  const carritoModalCount = document.getElementById("carrito-modal-count");
  carritoContainer.innerHTML = "";

  carritoCount.textContent = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  carritoModalCount.textContent = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );
  carrito.forEach((item) => {
    const platoItem = document.createElement("li");
    platoItem.classList.add("list-group-item");
    platoItem.innerHTML = `
        <span class="dish-name">${item.nombre}</span>
        <span class="dish-precio">${item.precio} €</span>
        <span class="dish-cantidad">${item.cantidad}</span>
        <button class="btn btn-sm btn-danger btn-quitar" data-nombre="${item.nombre}">
          <i class="fas fa-minus"></i>
        </button>
      `;
    carritoContainer.appendChild(platoItem);
  });
  // Agregar eventos de clic a los botones "Quitar del carrito"
  const botonesQuitar = document.querySelectorAll(".btn-quitar");
  botonesQuitar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      quitarDelCarrito(nombre);
    });
  });
}
// Agregar eventos de clic a los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll(".btn-agregar");
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);
    agregarAlCarrito(nombre, precio);
  });
});
// Llamada inicial para mostrar el carrito vacío
mostrarCarrito();
