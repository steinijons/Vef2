import { combineReducers } from 'redux';
import pizza from './pizzaReducer';
import order from './orderReducer';


export default combineReducers combineReducers({
    pizza, order
});

{
    pizza: [],
    order: {}
}
