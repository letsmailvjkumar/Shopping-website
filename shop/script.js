const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const toggleButtons = document.querySelectorAll(".toggle-button");
let productsData = [];

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    productsData = products; // Assuming productsData is a global variable where you want to store the fetched products
    console.log(productsData); // Add this line to check the contents of the productsData array
    displayProducts(products); // Call the displayProducts function with the fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
fetchProducts();

// Function to generate a random color
function getRandomColor() {
  const colors = ["red", "blue", "green", "black", "white"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to generate a random size
function getRandomSize() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

// Function to add default values for colors and sizes to each product
function addDefaultValuesToProducts(products) {
  products.forEach((product) => {
    product.colors = product.colors || [getRandomColor()]; // Add default color if not provided
    product.sizes = product.sizes || [getRandomSize()]; // Add default size if not provided
  });
}

// Call the function to add default values to the products array
addDefaultValuesToProducts(products);

// Now, you can call the displayProducts function to display the products with default colors and sizes
displayProducts(products);

// Function to display products on the shop page
async function displayProducts() {
  const products = await fetchProducts();
  addRandomColorsAndSizesToProducts(products);

  const productContainer = document.getElementById("productContainer");

  // Check if the product container element exists before proceeding
  if (!productContainer) {
    console.error("Product container not found!");
    return;
  }

  productContainer.innerHTML = ""; // Clear the previous products

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("item");
    productElement.innerHTML = `
    <!-- Product details -->
    <img src="${product.image}" alt="${product.title}" />
    <div class="info">
      <div class="row">
        <div class="price">$${product.price}</div>
        <div class="sized">${product.sizes?.join(", ")}</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          ${product.colors
            .map((color) => `<div class="circle" style="background-color: ${color}"></div>`)
            .join("")}
        </div>
      </div>
      <div class="row">Rating: ${product.rating}</div>
    </div>
    <button class="addBtn">Add to Cart</button>
    `;

    // Get the addBtn element inside the current product element
    const addBtn = productElement.querySelector(".addBtn");

    // Check if the addBtn element exists before adding the event listener
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        // Implement the logic for adding the product to the cart here
        console.log(`Product "${product.title}" added to cart.`);
      });
    }

    productContainer.appendChild(productElement);
  });
}

// Call the displayProducts function to show products on the shop page
displayProducts();

// Display products based on filters
function displayProducts(products) {
  const productContainer = document.getElementById("productContainer"); // Get the product container element here

  // Check if the product container element exists before proceeding
  if (!productContainer) {
    console.error("Product container not found!");
    return;
  }

  productContainer.innerHTML = ""; // Clear the previous products

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("item");
    productElement.innerHTML = `
      <!-- Product details -->
      <img src="${product.image}" alt="${product.title}" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">${product.size.join(", ")}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            ${product.colors
              .map((color) => `<div class="circle" style="background-color: ${color}"></div>`)
              .join("")}
          </div>
        </div>
        <div class="row">Rating: ${product.rating}</div>
      </div>
      <button class="addBtn">Add to Cart</button>
    `;

     // Get the addBtn element inside the current product element
     const addBtn = productElement.querySelector(".addBtn");

     // Check if the addBtn element exists before adding the event listener
     if (addBtn) {
       addBtn.addEventListener("click", () => {
         // Implement the logic for adding the product to the cart here
         console.log(`Product "${product.title}" added to cart.`);
       });
     }

    productContainer.appendChild(productElement);
  });


}


// Search functionality
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = "<p>No products found for the search term.</p>";
  }
});

// Toggle buttons functionality
toggleButtons.forEach((button) => {
  button.addEventListener("click", function () {
    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const category = this.dataset.category;

    if (category === "all") {
      displayProducts(productsData);
    } else {
      const filteredProducts = productsData.filter((product) => product.category.toLowerCase() === category);
      displayProducts(filteredProducts);

      if (filteredProducts.length === 0) {
        productContainer.innerHTML = "<p>No products found in this category.</p>";
      }
    }
  });
});