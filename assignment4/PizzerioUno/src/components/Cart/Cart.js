import React from 'react';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

var sum = 0;

const Cart = () => {

    let cartEmpty = null;

    var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];




    if (oldItems === undefined || oldItems.length == 0) {
        sum = 0;
        cartEmpty = <h3>Cart is empty!</h3>
    } else {
        for(var i = 0; i < oldItems.length; i++) {
            sum += (oldItems[i].price);
        }
        cartEmpty = <div className="cart-checkout">
            <Link to='Cart/Checkout'>
                <button
                    type="button"
                    className="checkout-button">
                    Check out!
                </button>
            </Link>
        </div>
    }
    return (

        <div className="cart-container">
            {cartEmpty}
            <div className="cart-pizza-wrapper">
                {oldItems.map(p => <CartItem key={p.id} CartItem={p} />)}
                <h3>Total: {sum}</h3>
            </div>

        </div>
    );
};

export default Cart;
