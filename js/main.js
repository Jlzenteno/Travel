document.addEventListener("DOMContentLoaded", () => {
    const destinosContainer = document.getElementById("destinosContainer");
    const reservaSection = document.getElementById("reservaSection");
    const carritoSection = document.getElementById("carritoSection");
    const verCarritoBtn = document.getElementById("verCarrito");
    const reservaForm = document.getElementById("reservaForm");
    let selectedDestino = null;

    function mostrarDestinos() {
        destinosContainer.innerHTML = "";

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
    }

    function ocultarElementos() {
        destinosContainer.style.display = "none";
        reservaSection.style.display = "none";
        carritoSection.style.display = "none";
    }

    function mostrarFormularioReserva(destino) {
        selectedDestino = destino;
        document.getElementById("reservaImagen").src = destino.imagen;
        document.getElementById("reservaDestino").textContent = destino.nombre;
        document.getElementById("reservaPrecio").textContent = `Precio por persona: $${destino.precio}`;
        document.getElementById("reservaTotal").textContent = `Total: $${destino.precio}`; 

        ocultarElementos();
        reservaSection.style.display = "block";

        document.getElementById("pasajeros").addEventListener("input", actualizarTotal);
    }

    function actualizarTotal() {
        const numPasajeros = document.getElementById("pasajeros").value;
        if (numPasajeros) {
            const total = selectedDestino.precio * numPasajeros;
            document.getElementById("reservaTotal").textContent = `Total: $${total}`;
        } else {
            document.getElementById("reservaTotal").textContent = `Total: $${selectedDestino.precio}`;
        }
    }

    reservaForm.addEventListener("submit", (e) => {
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
    });

    function agregarReservaAlCarrito(reserva) {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push(reserva);
        localStorage.setItem("reservas", JSON.stringify(reservas));

        reservaSection.style.display = "none";

        destinosContainer.style.display = "flex";

        mostrarDestinos();
        actualizarCarrito();
    }

    document.getElementById("volverAtras").addEventListener("click", () => {
        ocultarElementos();
        destinosContainer.style.display = "flex";
    });

    function actualizarCarrito() {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        verCarritoBtn.style.display = reservas.length ? "block" : "none";
    }

    mostrarDestinos();
    actualizarCarrito();
});
