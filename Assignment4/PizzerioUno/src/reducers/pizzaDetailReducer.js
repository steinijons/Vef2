import { GET_PIZZA_DETAIL } from '../constants/pizzaDetailConstants';

const pizzaDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PIZZA_DETAIL: return action.payload;
        default: return state;
    }
};

export default pizzaDetailReducer;
