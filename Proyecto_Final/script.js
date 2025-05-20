const API_URL = "https://fakestoreapi.com";
 const productsContainer = document.getElementById("productsContainer");
 const categoryFilter = document.getElementById("categoryFilter");
 const cartCountElement = document.getElementById("cart-count");

 // Elementos del modal
 const productModal = document.getElementById("productModal");
 const modalTitle = document.getElementById("modal-title");
 const modalImage = document.getElementById("modal-image");
 const modalDescription = document.getElementById("modal-description");
 const modalPrice = document.getElementById("modal-price");
 const modalStock = document.getElementById("modal-stock");
 const addToCartModalButton = document.getElementById("add-to-cart-modal");
 const closeModalButton = document.querySelector(".close-button");

 let products = [];
 let categories = [];
 let cart = {}; // Usaremos un objeto para rastrear la cantidad de cada producto en el carrito

 // Función para cargar el carrito desde localStorage
 function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
   cart = JSON.parse(storedCart);
   updateCartCount(); // Actualizar el contador al cargar el carrito
  }
 }

 // Función para guardar el carrito en localStorage
 function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
 }

 // Función para actualizar el contador del carrito
 function updateCartCount() {
  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  cartCountElement.textContent = totalItems;
 }

 async function fetchProducts(category) {
  let url = `${API_URL}/products`;
  if (category && category !== "all") {
   url += `/category/${category}`;
  }

  try {
   const response = await fetch(url);
   const data = await response.json();
   products = data;
   renderProducts(products);
  } catch (error) {
   console.error("Error fetching products:", error);
   productsContainer.innerHTML = "<p>Error al cargar los productos.</p>";
  }
 }

 function renderProducts(productList) {
  productsContainer.innerHTML = "";
  productList.forEach(product => {
   const productCard = document.createElement("div");
   productCard.classList.add("product-card");
   productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p class="price">$${product.price}</p>
    <button class="view-details" data-id="${product.id}">Ver detalles</button>
    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
   `;
   productsContainer.appendChild(productCard);
  });

  // Agregar event listeners a los botones después de renderizarlos
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  viewDetailsButtons.forEach(button => {
   button.addEventListener("click", showProductDetails);
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
   button.addEventListener("click", handleAddToCart);
  });
 }

 async function fetchCategories() {
  try {
   const response = await fetch(`${API_URL}/products/categories`);
   const data = await response.json();
   categories = ["all", ...data]; // Agregar "all" para mostrar todos los productos
   renderCategories();
  } catch (error) {
   console.error("Error fetching categories:", error);
  }
 }

 function renderCategories() {
  categories.forEach(category => {
   const option = document.createElement("option");
   option.value = category;
   option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalizar la primera letra
   categoryFilter.appendChild(option);
  });
 }

 function handleCategoryChange() {
  const selectedCategory = categoryFilter.value;
  fetchProducts(selectedCategory);
 }

 function handleAddToCart(event) {
  const productId = event.target.dataset.id;
  if (cart[productId]) {
   cart[productId]++;
  } else {
   cart[productId] = 1;
  }
  updateCartCount();
  saveCartToLocalStorage(); // Guardar el carrito en localStorage
  console.log("Carrito:", cart); // Para depuración
 }

 function showProductDetails(event) {
  const productId = event.target.dataset.id;
  const selectedProduct = products.find(product => product.id === parseInt(productId));

  if (selectedProduct) {
   modalTitle.textContent = selectedProduct.title;
   modalImage.src = selectedProduct.image;
   modalImage.alt = selectedProduct.title;
   modalDescription.textContent = selectedProduct.description;
   modalPrice.textContent = `$${selectedProduct.price}`;
   // La Fake Store API no proporciona el stock, así que mostraremos un mensaje genérico
   modalStock.textContent = "Stock disponible";
   addToCartModalButton.dataset.id = selectedProduct.id; // Establecer el ID en el botón del modal
   productModal.style.display = "block";
  }
 }

 // Cerrar el modal al hacer clic en la "x"
 closeModalButton.addEventListener("click", () => {
  productModal.style.display = "none";
 });

 // Cerrar el modal al hacer clic fuera del contenido del modal
 window.addEventListener("click", (event) => {
  if (event.target === productModal) {
   productModal.style.display = "none";
  }
 });

 // Event listener para el botón "Añadir al carrito" dentro del modal
 addToCartModalButton.addEventListener("click", handleAddToCart);

 // Inicialización
 document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage(); // Cargar el carrito al cargar la página principal
  fetchProducts();
  fetchCategories();
  categoryFilter.addEventListener("change", handleCategoryChange);
  updateCartCount(); // Inicializar el contador del carrito
 });