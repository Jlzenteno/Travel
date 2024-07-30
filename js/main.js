let carrito = [];
let cotizaciones = 0;
let nombreUsuario = '';

function calcularViaje() {
  const deseaCotizarPrompt = "¿Deseas cotizar un viaje? (Sí/No)";
  const bienvenida = "Bienvenido a la calculadora de viajes.";
  
  alert(bienvenida);
  
  let deseaCotizar;
  
  do {
    deseaCotizar = prompt(deseaCotizarPrompt);
    
    if (deseaCotizar === null) {
      alert("Has cancelado la cotización. Hasta luego.");
      return;
    }
    
    deseaCotizar = deseaCotizar.toLowerCase();
    
    if (deseaCotizar !== 'sí' && deseaCotizar !== 'si' && deseaCotizar !== 'no') {
      alert("Respuesta incorrecta. Por favor, responde 'Sí' o 'No'.");
    }
  } while (deseaCotizar !== 'sí' && deseaCotizar !== 'si' && deseaCotizar !== 'no');
  
  if (deseaCotizar === 'sí' || deseaCotizar === 'si') {
    const nombrePrompt = "Por favor, ingresa tu nombre:";
    nombreUsuario = prompt(nombrePrompt);
    
    if (nombreUsuario === null) {
      alert("Has cancelado la cotización. Hasta luego.");
      return;
    }
    
    document.getElementById('btnIniciar').textContent = `Cotizar otro viaje`;
    document.getElementById('btnIniciar').innerHTML = '<i class="fas fa-calculator"></i> Cotizar otro viaje';
    
    alert(`Hola ${nombreUsuario}. A continuación, te mostraremos nuestro catálogo de viajes disponibles`);
    
    seleccionarViaje();
  } else if (deseaCotizar === 'no') {
    alert("Gracias por visitar la calculadora de viajes. Hasta luego.");
  }
}

function seleccionarViaje() {
  let opcionViaje;
  
  do {
    const opcionesPrompt = "Selecciona un viaje para cotizar:\n\n1. Viaje a la playa ($200)\n2. Viaje a la montaña ($300)\n3. Viaje a la ciudad ($250)";
    opcionViaje = prompt(opcionesPrompt);
    
    if (opcionViaje === null) {
      alert("Has cancelado la cotización. Hasta luego.");
      return;
    }
    
    switch (opcionViaje) {
      case '1':
        cotizarViaje("Viaje a la playa", 200);
        break;
      case '2':
        cotizarViaje("Viaje a la montaña", 300);
        break;
      case '3':
        cotizarViaje("Viaje a la ciudad", 250);
        break;
      default:
        alert("Opción no válida. Por favor, selecciona una opción válida.");
    }
  } while (opcionViaje !== '1' && opcionViaje !== '2' && opcionViaje !== '3');
}

function cotizarViaje(nombreViaje, costoViaje) {
  const cantidadPrompt = `Perfecto ${nombreUsuario}. Has seleccionado "${nombreViaje}".\nIngrese la cantidad de personas:`;
  let cantidadPersonas = prompt(cantidadPrompt);
  
  if (cantidadPersonas === null) {
    alert("Has cancelado la cotización. Hasta luego.");
    return;
  }
  
  cantidadPersonas = parseInt(cantidadPersonas);
  
  if (isNaN(cantidadPersonas) || cantidadPersonas <= 0) {
    alert("Cantidad de personas no válida. Por favor, ingresa un número válido.");
    cotizarViaje(nombreViaje, costoViaje);
    return;
  }
  
  let costoTotal = costoViaje * cantidadPersonas;
  carrito.push({ nombreViaje, cantidadPersonas, costoTotal });
  cotizaciones++;
  
  alert(`El costo total para ${cantidadPersonas} personas en el "${nombreViaje}" es: $${costoTotal}`);
  
  document.getElementById('btnVerCarrito').textContent = `Ver Carrito (${cotizaciones})`;
}

function verCarrito() {
  if (carrito.length === 0) {
    alert(`Hola ${nombreUsuario}, tu carrito está vacío.`);
    return;
  }
  
  let mensajeCarrito = `Hola ${nombreUsuario}, aquí está tu carrito de compras:\n\n`;
  let totalCosto = 0;
  
  carrito.forEach((item, index) => {
    mensajeCarrito += `${index + 1}. ${item.nombreViaje} - ${item.cantidadPersonas} personas - $${item.costoTotal}\n`;
    totalCosto += item.costoTotal;
  });
  
  mensajeCarrito += `\nTotal del costo de todos los viajes: $${totalCosto}`;
  
  alert(mensajeCarrito);
}


document.getElementById('btnIniciar').addEventListener('click', () => {
  if (document.getElementById('btnIniciar').textContent.includes('Cotizar otro viaje')) {
    seleccionarViaje(); 
  } else {
    calcularViaje();
  }
});

document.getElementById('btnVerCarrito').addEventListener('click', verCarrito);
