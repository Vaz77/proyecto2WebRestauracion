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
        <img class="eliminarBoton btn-icon btn-quitar" src="../img/eliminar.png" alt="Remove" data-nombre="${item.nombre}">
        <i class="fas fa-minus"></i>
        </img>
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
    // Agregar la clase "selected" para activar la animación
    imagen.classList.add("flash-green");
    setTimeout(() => {
      imagen.classList.remove("flash-green");
    }, 500);
  });
});
// Agregar eventos de clic a las imágenes "Quitar del carrito"
const imagenesQuitar = document.querySelectorAll(".btn-icon.btn-quitar");
imagenesQuitar.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    const nombre = imagen.dataset.nombre;
    const platoExistente = carrito.find((item) => item.nombre === nombre);
    if (platoExistente && platoExistente.cantidad > 0) {
      quitarDelCarrito(nombre);
      imagen.classList.add("flash-red");
      setTimeout(() => {
        imagen.classList.remove("flash-red");
      }, 500);
    }
  });
});
// Función para calcular y mostrar el total de los platos en el carrito
function mostrarTotal() {
  const totalCarritoModal = document.querySelector(".total-carrito-modal");
  const total = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  totalCarritoModal.textContent = `Total a pagar: ${total.toFixed(2)} €`;
}
const realizarPedidoButton = document.getElementById("realizar-pedido");
const successMessage = document.getElementById("success-message");
const exitoMessage = document.getElementById("exito-message");
// Función para mostrar el mensaje de éxito y luego reiniciar el carrito y el mensaje
function mostrarMensajeExito() {
  exitoMessage.style.display = "block";
  setTimeout(() => {
    exitoMessage.style.display = "none";
    carrito.length = 0;
    mostrarCarrito();
  }, 2000);
}
// Función para actualizar el contenido del modal
function actualizarModal() {
  if (carrito.length > 0) {
    successMessage.style.display = "block";
    exitoMessage.style.display = "none";
  } else {
    successMessage.style.display = "none";
    exitoMessage.style.display = "none";
    realizarPedidoButton.style.display = "block";
  }
}
realizarPedidoButton.addEventListener("click", () => {
  // Verificar si hay elementos en el carrito
  if (carrito.length > 0) {
    // Mostrar mensaje de éxito y ocultar botón
    mostrarMensajeExito(); // Mostrar el mensaje de éxito
    successMessage.style.display = "none";
    realizarPedidoButton.style.display = "none";
    // Limpiar el carrito y actualizar la interfaz
    carrito.length = 0;
    mostrarCarrito();
    mostrarTotal();
    closeModal();
  } else {
    // Si no hay elementos en el carrito, muestra un mensaje de advertencia
    alert("El carrito está vacío. Agrega platos antes de realizar el pedido.");
  }
  actualizarModal();
});

mostrarCarrito();
