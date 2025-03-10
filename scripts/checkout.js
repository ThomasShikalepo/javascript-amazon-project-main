import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let cartSummaryHTML = '';
let cartQuantity = 0;

cart.forEach(
    (cartItem) => {
        const productId = cartItem.productId;
        let matchingProducts;

        products.forEach(
            (product) => {
                if (productId === product.id) {
                    matchingProducts = product;
                }
            }
        );

        cartQuantity += cartItem.quantity;

        cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
                <div class="delivery-date">Delivery date: Tuesday, June 21</div>

                <div class="cart-item-details-grid">
                <img
                    class="product-image"
                    src="${matchingProducts.image}"
                />

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProducts.name}
                    </div>
                    <div class="product-price">${formatCurrency(matchingProducts.priceCents)}</div>
                    <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingProducts.id}>
                        Update
                    </span>
                    <input type="text" class="quantity-input js-quantity-input-${matchingProducts.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = ${matchingProducts.id}>Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProducts.id}>
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProducts.id}"
                    />
                    <div>
                        <div class="delivery-option-date">Tuesday, June 21</div>
                        <div class="delivery-option-price">FREE Shipping</div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProducts.id}"
                    />
                    <div>
                        <div class="delivery-option-date">Wednesday, June 15</div>
                        <div class="delivery-option-price">$4.99 - Shipping</div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProducts.id}"
                    />
                    <div>
                        <div class="delivery-option-date">Monday, June 13</div>
                        <div class="delivery-option-price">$9.99 - Shipping</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `




    })
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML

document.querySelector('.js-display-cart-quantity').innerHTML = `${cartQuantity} items`

document.querySelectorAll('.js-delete-link').forEach(
    (link) => {
        link.addEventListener('click', () => {

            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`);

            if (container) {
                container.remove();
            }

            let updateCartQuantity = 0;

            cart.forEach(
                (items) => {
                    //recalculating the cart quantity after an item is removed
                    updateCartQuantity += items.quantity;
                }
            );
            document.querySelector('.js-display-cart-quantity').innerHTML = `${updateCartQuantity} items`;
        });
    }
)

document.querySelectorAll('.js-update-link').forEach(
    link => {
        link.addEventListener(
            'click', () => {
                const productId = link.dataset.productId;



                const container = document.querySelector(`.js-cart-item-container-${productId}`);

                container.classList.add('is-editing-quantity');
            }
        )


    }
)

document.querySelectorAll('.js-save-quantity-link').
    forEach(
        (link) => {

            link.addEventListener(
                'click', () => {
                    const productId = link.dataset.productId;

                    const container = document.querySelector(
                        `.js-cart-item-container-${productId}`
                    );
                    container.classList.remove('is-editing-quantity');
                }
            )

        }
    )

document.querySelectorAll('.js-update-link').forEach(
    (link) => {
        link.addEventListener(
            'click', () => {
                const productId = link.dataset.productId;

                const container = document.querySelector(`js-quantity-input-${productId}`);

                container.classList.add('is-editing-quantity')
            }
        )
    }
)

document.querySelectorAll('.js-save-quantity-link').forEach(
    (link) => {
        link.addEventListener(
            'click', () => {
                const productId = link.dataset.productId;

                const container = document.querySelector(`.js-cart-item-container-${productId}`);

                container.classList.remove('is-editing-quantity');

                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                const newQuantity = Number(quantityInput.value);

                console.log(newQuantity)
            }
        );
    }
);