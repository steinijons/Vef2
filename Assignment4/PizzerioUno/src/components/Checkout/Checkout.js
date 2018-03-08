import React from 'react';
import { Link } from 'react-router-dom';
// Linkar á delivery/takeAway síðuna

const Checkout = () => {
    //var oldItems = JASON.parse(localStorage.getItem('cartArray')) || [];
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
        </div>
    );
};

export default Checkout;
