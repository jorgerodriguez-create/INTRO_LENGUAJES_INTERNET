document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn-carrito");
  
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const producto = boton.getAttribute("data-producto");
        alert(`"${producto}" ha sido añadido al carrito.`);
      });
    });
  });
  