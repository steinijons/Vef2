import { ADD_TO_CART } from '../constants/addToCartConstant.js';

const addToCartReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log('reducer: ' + action.payload.name);
            return state + action.payload;
        default: return state;
    }
}

export default addToCartReducer;
