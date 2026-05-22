
const pages = document.querySelectorAll(".page");

function showPage(pageId){

  pages.forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(pageId).classList.remove("hidden");
}

window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#","") || "home";
  showPage(page);
});

showPage(location.hash.replace("#","") || "home");

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

async function fetchProducts(){

  try{

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    allProducts = data;

    displayProducts(allProducts);

  }catch(error){

    productGrid.innerHTML = "<p>Failed to load products.</p>";
  }
}

function displayProducts(products){

  productGrid.innerHTML = "";

  products.forEach(product => {

    productGrid.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      </div>
    `;
  });
}

searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

fetchProducts();
