const dessertWrapper = document.querySelector('.desserts-wrapper');
const noOfCartItems = document.querySelector('.no-of-items-in-cart');
const cartItems = document.querySelector('.cart-items')
const totalPrice = document.querySelector('.total-order-amount');
const noItem = document.querySelector('.no-item');
const cartFooter = document.querySelector('.cart-display-footer')
const decreaseBtn = document.querySelectorAll('.decrease-btn');
const increaseBtn = document.querySelectorAll('.increase-btn');
const qtyNumber = document.querySelectorAll('.quantity-number');
const cancelBtns = document.querySelectorAll('.cancel');

let cart = []


document.addEventListener('DOMContentLoaded', () => {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        renderProducts(data)
 })
 .catch(error => ('Error loading products:', error))

})

function renderProducts(data) {
    data.forEach((dessert, index) => {
        const screenWidth = window.innerWidth;
        let imageUrl = "";

        if (screenWidth <= 650) {
            imageUrl = dessert.image.mobile;
        } else if (screenWidth > 650 && screenWidth < 1000) {
            imageUrl = dessert.image.tablet;
        } else if (screenWidth >= 1000) {
            imageUrl = dessert.image.desktop;
        }
        
        

        const dessertHTML = `
            <div class="dessert-card">
                <div class="dessert-image" style="background-image: url('${imageUrl}')">
                    <div class="cart-component">
                        <div class="add-to-cart" onclick="addToCart('${dessert.name}', '${dessert.price}')">
                            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" class="cart-icon">
                            <p>Add to Cart</p>
                        </div>
                        <div class="quantity">
                            <div class="decrease-btn" data-index=${index} onclick="decrement('${dessert.name}')">
                                <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement quantity icon">
                            </div>
                            <p class="quantity-number">1</p>
                            <div class="increase-btn" data-index=${index} onclick="increment('${dessert.name}')">
                                <img src="./assets/images/icon-increment-quantity.svg" alt="Increment quantity icon">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dessert-card-text">
                    <p class="dessert-name">${dessert.category}</p>
                    <p class="dessert-description">${dessert.name}</p>
                    <p class="dessert-price">$${dessert.price.toFixed(2)}</p>
                </div>
            </div>
        `;

        dessertWrapper.insertAdjacentHTML('beforeend', dessertHTML);

});

}

// function addToCartBtnClicked() {
//     const addToCartBtns = document.querySelectorAll('.add-to-cart');
//     const quantityofItem = document.querySelectorAll('.quantity');
//     const cartComponent = document.querySelectorAll('.cart-component')
        

//     addToCartBtns.forEach((btn,index) => {btn.addEventListener("click", (event) => {
//              btn.style.display = 'none';
//              quantityofItem[index].style.display = "flex";
//              cartComponent[index].style.border = "0px";
//              const productIndex = btn.getAttribute('data-index')
//              const product = data[productIndex]
//              product.quantity = 1
//              addToCart(product)
//                 });
//              });
// }

function addToCart(name, price) {
    cart.push({name, price, quantity: 1})
    updateCart()
}

function updateCart() {
    cart.forEach(item => {
        let cartItemContents = `<div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <div class="cart-item-description">
                            <p class="number-of-item">${item.quantity}×</p>
                            <p class="cart-item-price">@ $${item.price}</p>
                            <p class="cart-item-total-price">$5.50</p>
                        </div>
                    </div>`
    let cartItem = document.createElement('li')
    cartItem.classList.add('cart-item')
    cartItem.innerHTML = cartItemContents
    cartItems.appendChild(cartItem)
    })
}



