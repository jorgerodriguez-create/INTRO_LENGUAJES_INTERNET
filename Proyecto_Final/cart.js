const cartItemsContainer = document.getElementById("cart-items-container");
 const totalPriceElement = document.getElementById("total-price");
 const clearCartButton = document.getElementById("clear-cart-button");
 const backToStoreButton = document.getElementById("back-to-store-button");
 const cartCountHeader = document.getElementById("cart-count-header");

 let cart = {}; // Objeto para almacenar los items del carrito (ID: cantidad)
 let productsData = []; // Almacenará la información completa de los productos

 // Función para cargar el carrito desde el localStorage
 function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
   cart = JSON.parse(storedCart);
  }
  updateCartDisplay();
 }

 // Función para guardar el carrito en el localStorage
 function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountHeader();
 }

 // Función para obtener la información completa de los productos desde la API
 async function fetchProductsData() {
  try {
   const response = await fetch("https://fakestoreapi.com/products");
   productsData = await response.json();
   loadCart(); // Cargar el carrito después de obtener los datos de los productos
  } catch (error) {
   console.error("Error fetching products data:", error);
   cartItemsContainer.innerHTML = "<p>Error al cargar los productos del carrito.</p>";
  }
 }

 // Función para actualizar el contador del carrito en el header
 function updateCartCountHeader() {
  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  cartCountHeader.textContent = totalItems;
 }

 // Función para renderizar los items del carrito en la página
 function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  for (const productId in cart) {
   const quantity = cart[productId];
   const product = productsData.find(p => p.id === parseInt(productId));

   if (product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
     <img src="${product.image}" alt="${product.title}">
     <div class="cart-item-details">
      <h4>${product.title}</h4>
      <p>Precio: $${product.price}</p>
     </div>
     <div class="cart-item-quantity">Cantidad: ${quantity}</div>
     <div class="cart-item-actions">
      <button class="remove-one-button" data-id="${productId}">Eliminar uno</button>
      <button class="remove-all-button" data-id="${productId}">Eliminar todo</button>
     </div>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += product.price * quantity;
   }
  }

  totalPriceElement.textContent = total.toFixed(2);

  // Agregar event listeners a los botones de eliminar
  const removeOneButtons = document.querySelectorAll(".remove-one-button");
  removeOneButtons.forEach(button => {
   button.addEventListener("click", removeOneFromCart);
  });

  const removeAllButtons = document.querySelectorAll(".remove-all-button");
  removeAllButtons.forEach(button => {
   button.addEventListener("click", removeAllFromCart);
  });

  // Mostrar mensaje si el carrito está vacío
  if (Object.keys(cart).length === 0) {
   cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
   totalPriceElement.textContent = "0.00";
  }
 }

 // Función para eliminar un producto del carrito
 function removeOneFromCart(event) {
  const productIdToRemove = event.target.dataset.id;
  if (cart[productIdToRemove] > 1) {
   cart[productIdToRemove]--;
  } else {
   delete cart[productIdToRemove];
  }
  saveCart();
  updateCartDisplay();
 }

 // Función para eliminar todos los productos de un tipo del carrito
 function removeAllFromCart(event) {
  const productIdToRemove = event.target.dataset.id;
  delete cart[productIdToRemove];
  saveCart();
  updateCartDisplay();
 }

 // Función para vaciar completamente el carrito
 function clearCart() {
  cart = {};
  saveCart();
  updateCartDisplay();
 }

 // Event listener para el botón de vaciar carrito
 clearCartButton.addEventListener("click", clearCart);

 // Event listener para el botón de regresar a la tienda
 backToStoreButton.addEventListener("click", () => {
  window.location.href = "index.html"; // Redirigir a la página principal
 });

 // Inicialización
 fetchProductsData();
 updateCartCountHeader(); // Inicializar el contador del header al cargar la página