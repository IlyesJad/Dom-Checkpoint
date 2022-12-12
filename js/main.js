let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
};
closeCart.onclick = () => {
    cart.classList.remove('active');
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    //  console.log(removeCartButtons);
    for (i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
        updatetotal();
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cart');
    for (i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    var hearts = document.querySelectorAll('.bxs-heart');
    hearts.forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('active'))
    })
}

function removeCartItem(event) {
    var bottonClicked = event.target;
    bottonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    // console.log(title,price,productImg);
    addProductsToCart(title, price, productImg);
    updatetotal();
}
function addProductsToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    console.log(cartShopBox.innerHTML);
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    // console.log(cartItems);
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    // console.log(cartItemsNames);
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('you have alreay add this item to cart');
            return;
        }
    }
    var cartBoxContent = `<img src=${productImg} alt="" class="cart-img">
                    <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class="bx bxs-trash-alt cart-remove"></i>`;


    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    if (cartBoxes.length === 0) {
        total = 0;
        document.getElementsByClassName('totla-price')[0].innerText = "$" + total;
    } else {
        for (i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
            total = Math.round(total * 100) / 100;

            document.getElementsByClassName('totla-price')[0].innerText = "$" + total;

        }
    }
}