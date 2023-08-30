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
  mostrarTotal();
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
    mostrarTotal();
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
// Agregar eventos de clic a las imágenes "Agregar al carrito"
const imagenesAgregar = document.querySelectorAll(".btn-icon.btn-agregar");
imagenesAgregar.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    const nombre = imagen.dataset.nombre;
    const precio = parseFloat(imagen.dataset.precio);
    agregarAlCarrito(nombre, precio);
  });
});
// Agregar eventos de clic a las imágenes "Quitar del carrito"
const imagenesQuitar = document.querySelectorAll(".btn-icon.btn-quitar");
imagenesQuitar.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    const nombre = imagen.dataset.nombre;
    quitarDelCarrito(nombre);
  });
});
// Función para calcular y mostrar el total de los platos en el carrito
function mostrarTotal() {
  const totalCarritoModal = document.querySelector(".total-carrito-modal");
  const total = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  totalCarritoModal.textContent = `Total: ${total.toFixed(2)} €`;
}
// Llamada a la función inicial para mostrar el carrito vacío
mostrarCarrito();
