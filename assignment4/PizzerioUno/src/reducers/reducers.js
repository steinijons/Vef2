import { combineReducers } from 'redux';
import pizza from './pizzaReducer';
import order from './orderReducer';
import offer from './offerReducer';
import pizzaDetail from './pizzaDetailReducer';

export default combineReducers({
    pizza, order, offer, pizzaDetail
});
