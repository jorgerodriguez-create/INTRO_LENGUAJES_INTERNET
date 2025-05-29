document.getElementById("checkout-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const account = document.getElementById("account");
  const message = document.getElementById("message");

  if (!email.checkValidity()) {
    message.textContent = "Correo inválido. Asegúrate de incluir '@' y un dominio válido.";
    message.style.color = "red";
    return;
  }

  if (!password.checkValidity()) {
    message.textContent = "Contraseña inválida. Debe tener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número.";
    message.style.color = "red";
    return;
  }

  if (!account.checkValidity()) {
    message.textContent = "Número de cuenta inválido. Debe tener entre 12 y 19 dígitos numéricos.";
    message.style.color = "red";
    return;
  }

  // Mostrar mensaje de éxito
  message.style.color = "green";
  message.textContent = "¡Compra realizada con éxito! Redirigiendo...";

  // Limpiar carrito simulado
  localStorage.removeItem("cart");

  // Redirigir luego de 3 segundos
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
});

document.getElementById("back-button").addEventListener("click", function () {
  window.location.href = "cart.html";
});
