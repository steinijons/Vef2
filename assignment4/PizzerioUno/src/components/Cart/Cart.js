import React from 'react';
import Pizza from '../Pizza/Pizza';
import { Link } from 'react-router-dom';

const Cart = () => {

    var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];

    return (
        <div className="cart-container">
            <div className="cart-pizza-wrapper">
                {oldItems.map(p => <Pizza key={p.pizza.id} pizza={p.pizza} />)}
            </div>
            <div className="cart-checkout">
                <Link to='Cart/Checkout'>
                    <button
                        type="button"
                        className="checkout-button"
                    >
                        Check out!
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
