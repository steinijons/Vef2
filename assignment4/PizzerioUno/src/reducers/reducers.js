import { combineReducers } from 'redux';
import pizza from './pizzaReducer';
import order from './orderReducer';
import offer from './offerReducer';
import addToCart from './addToCartReducer';

export default combineReducers({
    pizza, order, offer, addToCart
});
