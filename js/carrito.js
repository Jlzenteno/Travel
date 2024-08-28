document.addEventListener("DOMContentLoaded", () => {
    const verCarritoBtn = document.getElementById("verCarrito");
    const carritoSection = document.getElementById("carritoSection");
    const carritoItems = document.getElementById("carritoItems");
    const totalCosto = document.getElementById("totalCosto");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
    const cerrarCarritoBtn = document.getElementById("cerrarCarrito");
    let destinos = [];

    // Cargar destinos desde el JSON
    fetch('data/destinos.json')
        .then(response => response.json())
        .then(data => {
            destinos = data;
            actualizarCarrito();
        })
        .catch(error => {
            console.error('Error al cargar los destinos:', error);
            Swal.fire('Error', 'No se pudieron cargar los destinos.', 'error');
        });

    function ocultarElementos() {
        carritoSection.style.display = "none";
    }

    function mostrarCarrito() {
        ocultarElementos();
        carritoItems.innerHTML = "";
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        let total = 0;

        let compradorNombre = document.getElementById("compradorNombre");
        if (!compradorNombre) {
            compradorNombre = document.createElement("p");
            compradorNombre.id = "compradorNombre";
            carritoSection.insertBefore(compradorNombre, carritoItems);
        }
        const nombreComprador = localStorage.getItem("nombreComprador") || "Desconocido";
        compradorNombre.textContent = `Nombre del Comprador: ${nombreComprador}`;

        if (reservas.length === 0) {
            compradorNombre.style.display = "none";
        } else {
            compradorNombre.style.display = "block";
        }

        reservas.forEach((reserva, index) => {
            const item = document.createElement("li");

            const imagen = document.createElement("img");
            imagen.src = destinos.find(d => d.nombre === reserva.destino).imagen;
            imagen.alt = reserva.destino;
            imagen.style.width = "50px";
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
        carritoSection.style.display = "block";
    }

    function eliminarReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.splice(index, 1);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarCarrito();
        actualizarCarrito();
        Swal.fire('Eliminado', 'La reserva ha sido eliminada del carrito', 'info');
    }

    function vaciarCarrito() {
        localStorage.removeItem("reservas");
        mostrarCarrito();
        actualizarCarrito();
        Swal.fire('Carrito Vacío', 'El carrito ha sido vaciado', 'info');
    }

    function cerrarCarrito() {
        ocultarElementos();
        // Mostrar la sección de destinos si es necesario
        document.getElementById("destinosContainer").style.display = "flex";
    }

    function actualizarCarrito() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        verCarritoBtn.style.display = reservas.length ? "block" : "none";
    }

    verCarritoBtn.addEventListener("click", () => {
        mostrarCarrito();
    });

    vaciarCarritoBtn.addEventListener("click", () => {
        vaciarCarrito();
    });

    cerrarCarritoBtn.addEventListener("click", () => {
        cerrarCarrito();
    });

    // Llama a actualizarCarrito() para configurar el botón de ver carrito
    actualizarCarrito();
});
