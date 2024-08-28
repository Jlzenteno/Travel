document.addEventListener("DOMContentLoaded", () => {
    const verCarritoBtn = document.getElementById("verCarrito");
    const carritoSection = document.getElementById("carritoSection");
    const carritoItems = document.getElementById("carritoItems");
    const totalCosto = document.getElementById("totalCosto");
    const destinosContainer = document.getElementById("destinosContainer");
    const reservaSection = document.getElementById("reservaSection");
    let destinos = [];
    let selectedDestino = null;

    // Función para cargar los destinos desde el JSON
    function cargarDestinos() {
        fetch('data/destinos.json')
            .then(response => response.json())
            .then(data => {
                destinos = data;
                mostrarDestinos(); // Mostrar los destinos después de cargarlos
            })
            .catch(error => {
                console.error('Error al cargar los destinos:', error);
                Swal.fire('Error', 'No se pudieron cargar los destinos.', 'error');
            });
    }

    // Función para mostrar las tarjetas de destino
    function mostrarDestinos() {
        ocultarElementos(); // Oculta todas las secciones antes de mostrar los destinos
        destinosContainer.innerHTML = ""; // Limpia el contenedor antes de agregar las tarjetas

        destinos.forEach(destino => {
            const card = document.createElement("div");
            card.classList.add("destino-card");
            card.innerHTML = `
                <img src="${destino.imagen}" alt="${destino.nombre}">
                <h3>${destino.nombre}</h3>
                <p>${destino.descripcion}</p>
                <p><strong>Precio: $${destino.precio}</strong></p>
                <button>Reservar</button>
            `;

            card.querySelector("button").addEventListener("click", () => {
                mostrarFormularioReserva(destino);
            });

            destinosContainer.appendChild(card);
        });

        destinosContainer.style.display = "flex"; // Asegura que el contenedor sea visible
    }

    // Función para ocultar todas las secciones
    function ocultarElementos() {
        destinosContainer.style.display = "none";
        reservaSection.style.display = "none";
        carritoSection.style.display = "none";
    }

    // Función para mostrar el formulario de reservas
    function mostrarFormularioReserva(destino) {
        selectedDestino = destino; // Asigna el destino seleccionado

        document.getElementById("reservaImagen").src = destino.imagen;
        document.getElementById("reservaDestino").textContent = destino.nombre;
        document.getElementById("reservaPrecio").textContent = `Precio por persona: $${destino.precio}`;
        document.getElementById("reservaTotal").textContent = `Total: $${destino.precio}`; // Total inicial

        ocultarElementos(); // Oculta las otras secciones antes de mostrar el formulario de reserva
        reservaSection.style.display = "block"; // Mostrar la sección de reserva

        // Actualiza el total cuando cambia el número de pasajeros
        document.getElementById("pasajeros").addEventListener("input", actualizarTotal);

        // Manejo del formulario de reservas
        document.getElementById("reservaForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const reserva = {
                nombre: document.getElementById("nombre").value,
                telefono: document.getElementById("telefono").value,
                email: document.getElementById("email").value,
                pasajeros: document.getElementById("pasajeros").value,
                destino: selectedDestino.nombre,
                precio: selectedDestino.precio
            };
            agregarReservaAlCarrito(reserva);
            Swal.fire('Reserva Confirmada', 'Tu viaje ha sido reservado exitosamente', 'success');
        });
    }

    // Función para actualizar el total en el formulario de reservas
    function actualizarTotal() {
        const numPasajeros = document.getElementById("pasajeros").value;
        const total = numPasajeros ? selectedDestino.precio * numPasajeros : selectedDestino.precio;
        document.getElementById("reservaTotal").textContent = `Total: $${total}`;
    }

    // Función para agregar una reserva al carrito
    function agregarReservaAlCarrito(reserva) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        const index = reservas.findIndex(r => r.destino === reserva.destino && r.nombre === reserva.nombre && r.telefono === reserva.telefono && r.email === reserva.email);

        if (index !== -1) {
            // Si la reserva ya existe, actualiza el número de pasajeros
            reservas[index].pasajeros = reserva.pasajeros;
        } else {
            // Si la reserva no existe, agrégala
            reservas.push(reserva);
        }
        
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarDestinos(); // Vuelve a mostrar las tarjetas de destino después de agregar la reserva
        actualizarCarrito(); // Actualiza el carrito
    }

    // Función para actualizar el botón de ver carrito
    function actualizarCarrito() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        verCarritoBtn.style.display = reservas.length ? "block" : "none";
    }

    // Función para mostrar el carrito
    function mostrarCarrito() {
        ocultarElementos(); // Ocultar otras secciones
        carritoItems.innerHTML = "";
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        let total = 0;

        // Mostrar el nombre del comprador solo una vez
        let compradorNombre = document.getElementById("compradorNombre");
        if (!compradorNombre) {
            compradorNombre = document.createElement("p");
            compradorNombre.id = "compradorNombre";
            carritoSection.insertBefore(compradorNombre, carritoItems);
        }
        const nombreComprador = localStorage.getItem("nombreComprador") || "Desconocido";
        compradorNombre.textContent = `Nombre del Comprador: ${nombreComprador}`;

        if (reservas.length === 0) {
            compradorNombre.style.display = "none"; // Ocultar el nombre si el carrito está vacío
        } else {
            compradorNombre.style.display = "block";
        }

        reservas.forEach((reserva, index) => {
            const item = document.createElement("li");

            // Crear imagen pequeña del producto
            const imagen = document.createElement("img");
            imagen.src = destinos.find(d => d.nombre === reserva.destino).imagen;
            imagen.alt = reserva.destino;
            imagen.style.width = "50px"; // Ajusta el tamaño según prefieras
            imagen.style.height = "auto";
            imagen.style.marginRight = "10px";
            
            item.appendChild(imagen);
            item.appendChild(document.createTextNode(`${reserva.destino} - ${reserva.pasajeros} pasajeros - $${reserva.precio * reserva.pasajeros}`));
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                eliminarReserva(index);
            });

            item.appendChild(deleteBtn);
            carritoItems.appendChild(item);

            total += reserva.precio * reserva.pasajeros;
        });

        totalCosto.textContent = `Total a Pagar: $${total}`;
        carritoSection.style.display = "block"; // Mostrar la sección del carrito
    }

    // Función para eliminar una reserva del carrito
    function eliminarReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.splice(index, 1);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarCarrito();
        actualizarCarrito();
        Swal.fire('Eliminado', 'La reserva ha sido eliminada del carrito', 'info');
    }

    // Manejo del botón "Ver Carrito"
    verCarritoBtn.addEventListener("click", () => {
        mostrarCarrito();
    });

    // Cargar y mostrar los destinos al cargar la página
    cargarDestinos();
    actualizarCarrito(); // Actualizar el estado del botón "Ver Carrito"
});
