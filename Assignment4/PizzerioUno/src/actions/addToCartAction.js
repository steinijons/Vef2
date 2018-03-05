import { ADD_TO_CART } from '../constants/addToCartConstant';

export const addToCart = (pizza) => {
    return {
        type: ADD_TO_CART,
        payload: pizza
    };
};
