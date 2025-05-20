const API_URL = "https://fakestoreapi.com";
let products = [];
let categories = [];
let currenPage = 1;
let filteredPRoducts = [];
let productPerPage = 8 ;
let cart = [];

document.addEventListener('DOMContentLoaded', ()=>{
    fetchProducts();
});

async function fetchProducts() {
try {
const response = await fetch(`${API_URL}/products`);
if(!response.ok){
    console.error("error al cargar los productos");
}
products = await response.json();
const productsContainer = document.getElementById("productsContainer");
productsContainer.innerHTML = "";

products.forEach(product => { // Cambié 'products' a 'product'
    const productCard = document.createElement("div");
    productCard.className ="product-card";
    productCard.innerHTML = `
    <div class="product-image">
    <img src="${product.image}">
    </div>

    <div class="product-info">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-category">${product.category}</p>
    <div class="product-price">${product.price}</div>
    <div class="product-description">${product.description}</div>
    <button class="btnagregar">Añadir al carrito</button>

    </div>
    `;

    productsContainer.appendChild(productCard);
});

}catch(error){
console.log(`error: ${error}`);
}
};