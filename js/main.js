function calcularViaje() {
    const iniciarCalculadora = "¿Deseas cotizar un viaje? (Sí/No)";
    const bienvenida = "Bienvenido a la calculadora de viajes.";
  
    alert(bienvenida);
  
    let deseaCotizar;
  
    do {
      deseaCotizar = prompt(iniciarCalculadora);
  
      if (deseaCotizar === null) {
        return alert("Has cancelado la cotización. Hasta luego.");
      }
  
      deseaCotizar = deseaCotizar.toLowerCase();
  
      if (
        deseaCotizar !== "sí" &&
        deseaCotizar !== "si" &&
        deseaCotizar !== "no"
      ) {
        alert("Respuesta incorrecta. Por favor, responde 'Sí' o 'No'.");
      }
    } while (
      deseaCotizar !== "sí" &&
      deseaCotizar !== "si" &&
      deseaCotizar !== "no"
    );
  
    if (deseaCotizar === "no") {
      return alert("Gracias por visitar la calculadora de viajes. Hasta luego.");
    }
  
    const nombre = prompt("Por favor, ingresa tu nombre:");
  
    if (nombre === null) {
      return alert("Has cancelado la cotización. Hasta luego.");
    }
  
    alert(
      `Hola ${nombre}. A continuación, te mostraremos nuestro catálogo de viajes disponibles`
    );
  
    let opcionViaje;
  
    do {
      const opciones =
        "Catálogo de viajes\nSelecciona un viaje para cotizar:\n\n1. Viaje a la playa ($200)\n2. Viaje a la montaña ($300)\n3. Viaje a la ciudad ($250)";
      opcionViaje = prompt(opciones);
  
      if (opcionViaje === null) {
        return alert("Has cancelado la cotización. Hasta luego.");
      }
  
      switch (opcionViaje) {
        case "1":
          cotizarViaje("Viaje a la playa", 200);
          break;
        case "2":
          cotizarViaje("Viaje a la montaña", 300);
          break;
        case "3":
          cotizarViaje("Viaje a la ciudad", 250);
          break;
        default:
          alert("Opción no válida. Por favor, selecciona una opción válida.");
      }
    } while (opcionViaje !== "1" && opcionViaje !== "2" && opcionViaje !== "3");
  }

  function cotizarViaje(nombreViaje, costoViaje) {
    let cantidadPersonas;
  
    do {
      const cantidad = `Has seleccionado "${nombreViaje}".\nIngrese la cantidad de personas:`;
      cantidadPersonas = prompt(cantidad);
  
      if (cantidadPersonas === null) {
        return alert("Has cancelado la cotización. Hasta luego.");
      }
  
      cantidadPersonas = parseInt(cantidadPersonas);
  
      if (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
        alert(
          "Cantidad de personas no válida. Por favor, ingresa un número válido."
        );
      }
    } while (isNaN(cantidadPersonas) || cantidadPersonas <= 0);
  
    const costoTotal = costoViaje * cantidadPersonas;
  
    alert(
      `El costo total para ${cantidadPersonas} personas en el "${nombreViaje}" es: $${costoTotal}`
    );
  }
  
  const btnIniciar = document.getElementById("btnIniciar");
  btnIniciar.addEventListener("click", calcularViaje);
  