import React from 'react';
//import { PropTypes } from 'prop-types';
//import { connect } from 'react-redux';
//import Pizza from '../Pizza/Pizza';

class CartRemove extends React.Component {

    removeFromCart(pizza) {

        var cart = JSON.parse(localStorage.getItem('cartArray')) || []; //fetch cart from storage
        var items = cart || []; //get the products

        for (var i = 0; i < cart.length; i++) { //loop over the collection
            console.log(cart[i].id)
            if (cart[i].id === pizza.id) { //see if ids match
                items.splice(i, 1); //remove item from array
                break; //exit loop
            }
        }
        localStorage.setItem('cartArray', JSON.stringify(cart)); //set item back into storage
    }

    render() {
        const { pizza } = this.props;
        return (
            <div className="removePizzaFromCartBtn">
                <form>
                    <button
                        type="submit"
                        onClick={()=>this.removeFromCart(pizza)}>Remove from cart
                    </button>
                </form>
            </div>
        );
    }
}

export default CartRemove;
