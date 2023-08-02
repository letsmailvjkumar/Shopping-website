const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
const checkoutDiv = document.getElementById('checkout');

function displayProduct(product) {
    const container = document.getElementById('items');
    container.innerHTML = '';
    const productDiv = document.createElement('div');
    productDiv.className = 'item';
    productDiv.innerHTML=`
        <img src="${product.image}" alt ="${product.title}">
        <div class ="info">
            <div class="title"><p>${product.title}</p></div>
            <div class ="row">
                <div class="price"><p>Price : $${product.price}</p></div>
            </div>
            <div class="quantity">
                <div class ="row"><p>Quantity :1</div>
            </div>
            <button id="removeBtn">Remove from Cart</button>
        </div>
    `;
    container.appendChild(productDiv);
}

displayProduct(selectedProduct);

document.addEventListener('click', function(event) {
    if (event.target.matches('#removeBtn')) {
      // Remove the selected product from local storage
      localStorage.removeItem('selectedProduct');
      // Update the display
      const container = document.getElementById('items');
      container.innerHTML = '';
    }
  });

// Because of this CDN. I am able to Razorpay
document.getElementById("rzp-button1").addEventListener('click', () =>{
var options = {
    key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
    amount: 100 ,//check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MeShop. Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#122620",
    },
    image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
    handler: function () { // run a function when your payment is successfull
      location.href = "./shop.html";
    },
    options: {
      checkout: {
        method: {
          netbanking: 0,
          card: 0,
          upi: 1,
          wallet: 0,
        },
      },
    },
};
var razorPayinstance = new Razorpay(options);
    razorPayinstance.open();
})


  