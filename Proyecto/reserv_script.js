document.getElementById("reserva-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = document.getElementById("personas").value;
  
    const mensaje = document.getElementById("mensaje-confirmacion");
  
    if (!nombre || !correo || !fecha || !hora || !personas) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }
  
    mensaje.style.display = "block";
    this.reset();
  });
  