import { combineReducers } from 'redux';
import pizzaReducer from './pizzaReducer';
import orderReducer from './orderReducer';
import offerReducer from './offerReducer';
import addToCartReducer from './addToCartReducer';

export default combineReducers({
    pizza: pizzaReducer,
    order: orderReducer,
    offer: offerReducer,
    addToCart: addToCartReducer
});
