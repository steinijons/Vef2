import React from 'react';
//import Pizza from '../Pizza/Pizza';


const Cart = () => {
    var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];

    const listItem = oldItems.map((item) =>
        console.log(item.pizza)
        //<li key={item.pizza.id}>{item.pizza}</li>
    );
    return (
        <div className="pizza-wrapper">
            <ul>
                {listItem}
            </ul>
        </div>
    );
};

export default Cart;
