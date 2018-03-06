import { GET_PIZZA_BY_ID } from '../constants/pizzaConstants';

const pizzaDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PIZZA_BY_ID: return action.payload;
        default: return state;
    }
}

export default pizzaDetailReducer;
