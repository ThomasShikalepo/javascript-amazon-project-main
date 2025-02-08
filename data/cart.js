export const cart = [];

export function addToCart(productId) {
    let matchingItem;

    cart.forEach(
        (cartIterm) => {
            if (productId === cartIterm.productId) {
                matchingItem = cartIterm; //checking if the iterm is in th cart already, it is saved in the matchingIthem so as to increase it quantity 
            }
        }
    );
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }

}
