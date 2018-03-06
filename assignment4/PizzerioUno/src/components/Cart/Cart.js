import React from 'react';
import Pizza from '../Pizza/Pizza';


const Cart = () => {
    var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];


    return (
        <div className="container">
            {oldItems.map(p => <Pizza key={p.pizza.id} pizza={p.pizza} />)}
        </div>
    );

};

export default Cart;
