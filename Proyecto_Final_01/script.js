const API_URL = "https://fakestoreapi.com";
let products = [];
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchCategories();
});

// Obtener productos
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Mostrar productos
function renderProducts(productList) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image"><img src="${product.image}" alt="${product.title}"></div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="btnagregar">Añadir al carrito</button>
      </div>
    `;
    card.addEventListener("click", () => showProductDetail(product));
    card.querySelector(".btnagregar").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });
    container.appendChild(card);
  });
}

// Obtener y mostrar categorías
async function fetchCategories() {
  const res = await fetch(`${API_URL}/products/categories`);
  const categories = await res.json();
  const container = document.getElementById("categoryFilters");

  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    });
    container.appendChild(button);
  });
}

// Mostrar detalles en modal
function showProductDetail(product) {
  const modal = document.getElementById("modal");
  const details = document.getElementById("modalDetails");

  details.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.image}" style="width:100%; max-height:300px; object-fit:contain;">
    <p>${product.description}</p>
    <p><strong>Precio:</strong> $${product.price}</p>
    <p><strong>Stock:</strong> ${product.rating.count}</p>
    <button class="btnagregar">Añadir al carrito</button>
  `;

  details.querySelector(".btnagregar").addEventListener("click", () => {
    addToCart(product);
    modal.style.display = "none";
  });

  modal.style.display = "flex";
  document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Carrito
function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "<h3>Carrito</h3>";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const itemEl = document.createElement("div");
    itemEl.innerHTML = `
      <p>${item.title} - $${item.price}</p>
      <button onclick="removeFromCart(${i})">Eliminar</button>
    `;
    cartContainer.appendChild(itemEl);
  });

  cartContainer.innerHTML += `<hr><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Login simulado
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    document.getElementById("welcomeMessage").textContent = `¡Bienvenido, ${username}!`;
    document.getElementById("loginForm").style.display = "none";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
