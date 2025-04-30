// Validación del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();  

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    // Verificar si los campos están vacíos
    if (nombre === '' || email === '' || mensaje === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar el formato del correo electrónico
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Mostrar el mensaje de confirmación
    document.getElementById('mensaje-confirmacion').style.display = 'block';

    // Limpiar los campos del formulario
    document.getElementById('contact-form').reset();
});
