const baseUrl = 'https://fakestoreapi.com';
const productAPI = 'https://fakestoreapi.com/products';

const searchInput = document.getElementById('searchInput');
const colorCheckBoxes = document.querySelectorAll('input[name="color"]');
const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
const priceCheckboxes = document.querySelectorAll('input[name="prange"]');
const productArray=[];

let colors = ['red', 'green', 'blue', 'black', 'white'];
let sizes = ['s', 'm', 'l', 'xl'];

function randomColor(){
    let color = colors[Math.floor(Math.random()*colors.length)];
    return color;
}

function randomRating(){
    let rating = Math.floor(Math.random()*5)+1;
    return rating;
}

function randomSize(){
  let size = sizes[Math.floor(Math.random()*sizes.length)];
  return size;
}

function displayRating(rating){
    let stars ='';
    for(let i=0;i<rating;i++){
        stars+='⭐';
    }
    return stars;
}
async function getProducts(){
    const response = await fetch(productAPI);
    const products = await response.json();
    for(let product of products){
        product.color=randomColor();
        product.rating = randomRating();
        product.star=displayRating(product.rating);
        product.size=randomSize();
    }
    productArray.push(...products);
    console.log(productArray)
    displayProducts(productArray);
    
}
getProducts();


function displayProducts(productArray){
    const container = document.getElementById('items');
    container.innerHTML = '';
    for(const product  of productArray){
        const productDiv = document.createElement('div');
        productDiv.className = 'item';
        productDiv.innerHTML=`
        
        <img src="${product.image}" alt ="${product.title}">
        <div class ="info">
            <div class="title"><p>${product.title}</p></div>
            <div class ="row">
            <div class="price"><p>Price : $${product.price}</p></div>
            <div class="sized"><p>Size : ${product.size}</p></div>
            </div>
            <div class="colors">
            <div class ="row"><p>color : ${product.color}</p></div>
            </div>
            <div class="row"><p>rating : ${product.star} ${product.rating}</p></div>
            <button id="addBtn">Add to Cart</button>
        </div>
        `;
        container.appendChild(productDiv);
    }
}


//seach function
searchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value.toLowerCase();
  const filteredProducts = productArray.filter(product => product.title.toLowerCase().includes(searchQuery));
  displayProducts(filteredProducts);
});

function applyFilters() {
  let filteredProducts = productArray;

  // Filter by color
  const selectedColors = Array.from(colorCheckBoxes )
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id);
  if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedColors.includes(product.color));
  }

  // Filter by size
  const selectedSizes = Array.from(sizeCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id);
  if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedSizes.includes(product.size));
  }

  // Filter by rating
  let selectedRating = document.getElementById('range').value;
  if (selectedRating > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.rating == selectedRating);
  };
  

  // Filter by price
  const selectedPrices = Array.from(priceCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id);
  if (selectedPrices.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
          if (selectedPrices.includes('0-25')) {
              return product.price >= 0 && product.price <= 25;
          }
          if (selectedPrices.includes('25-50')) {
              return product.price > 25 && product.price <= 50;
          }
          if (selectedPrices.includes('50-100')) {
              return product.price > 50 && product.price <= 100;
          }
          if (selectedPrices.includes('100on')) {
              return product.price > 100;
          }
      });
  }

  displayProducts(filteredProducts);
}
document.querySelector('.cart-btn').addEventListener('click', applyFilters);



document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-items').classList.toggle('show');
});


// store the item in local store
document.addEventListener('click', function(event) {
  if (event.target.matches('#addBtn')) {
    // Get the product title from the title element
    const productTitle = event.target.closest('.item').querySelector('.title p').textContent;
    // Find the product object in the productArray
    const selectedProduct = productArray.find(product => product.title === productTitle);
    // Store the selected product in local storage
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
  }
});
