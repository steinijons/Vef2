import React from 'react';
import { Link } from 'react-router-dom';

import CartItem from '../CartItem/CartItem';
// Linkar á delivery/takeAway síðuna

var sum = 0;

const Checkout = () => {
    //var oldItems = JASON.parse(localStorage.getItem('cartArray')) || [];
    var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];

    for(var i = 0; i < oldItems.length; i++) {
        sum += (oldItems[i].price);
    }

    console.log('checkout');
    return (
        <div className="checkout-container">
            <div>
                <h3>Would you like to pick up or have the pizza delivered?</h3>
            </div>

            <div className="checkout-delivered">
                <Link to='/Checkout/Delivered'>
                    <button
                        type="button"
                        className="deliver-button"
                    >
                        Delivered please
                    </button>
                </Link>
            </div>
            <div className="checkout-takeAway">
                <Link to='/Checkout/TakeAway'>
                    <button
                        type="button"
                        className="pickUp-button"
                    >
                        Take away!
                    </button>
                </Link>
            </div>
            <div className="cart-container">
                <div className="cart-pizza-wrapper">
                    <h3>Your order!</h3>
                    {oldItems.map(p => <CartItem key={p.id} CartItem={p} />)}
                    <h3>Total: {sum} </h3>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
