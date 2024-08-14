document.addEventListener("DOMContentLoaded", () => {
    const verCarritoBtn = document.getElementById("verCarrito");
    const carritoSection = document.getElementById("carritoSection");
    const carritoItems = document.getElementById("carritoItems");
    const totalCosto = document.getElementById("totalCosto");
    const destinosContainer = document.getElementById("destinosContainer");
    const reservaSection = document.getElementById("reservaSection");

    function ocultarElementos() {
        destinosContainer.style.display = "none";
        reservaSection.style.display = "none";
        carritoSection.style.display = "none";
    }

    verCarritoBtn.addEventListener("click", () => {
        mostrarCarrito();
    });

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
            
            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", () => eliminarReserva(index));
            item.appendChild(eliminarBtn);
            carritoItems.appendChild(item);
            total += reserva.precio * reserva.pasajeros;
        });

        totalCosto.textContent = `Total: $${total}`;
        carritoSection.style.display = "block";
    }

    function eliminarReserva(index) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.splice(index, 1);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        mostrarCarrito();
        actualizarCarrito();
    }

    document.getElementById("cerrarCarrito").addEventListener("click", () => {
        carritoSection.style.display = "none";
        destinosContainer.style.display = "flex";
    });

    document.getElementById("vaciarCarrito").addEventListener("click", () => {
        localStorage.removeItem("reservas");
        mostrarCarrito();
        actualizarCarrito();
    });

    function actualizarCarrito() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        verCarritoBtn.style.display = reservas.length ? "block" : "none";
    }

    actualizarCarrito();
});
