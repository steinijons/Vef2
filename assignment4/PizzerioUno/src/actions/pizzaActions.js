import { GET_ALL_PIZZAS } from '../constants/pizzaConstants';
import { GET_ALL_OFFERS } from '../constants/offerConstants';
import fetch from 'isomorphic-fetch';

export const getAllPizzas = () => {
    return dispatch => fetch('http://localhost:3500/api/pizzas').then(json => json.json()).then(data => dispatch(getAllPizzaSuccess(data)));
};

const getAllPizzaSuccess = (pizzas) => {
    return {
        type: GET_ALL_PIZZAS,
        payload: pizzas
    };
};

export const getAllOffers = () => {
    return dispatch => fetch('http://localhost:3500/api/offers').then(json => json.json()).then(data => dispatch(getAllOffersSuccess(data)));
};

const getAllOffersSuccess = (offers) => {
    return {
        type: GET_ALL_OFFERS,
        payload: offers
    };
};

export const getPizzaDetailsById = (id) => {
    return dispatch => {
        dispatch(clearPizzaDetails());
        return fetch(`http://localhost:3500/api/pizzas/${id}`).then(r => r.json()).then(data => data ? dispatch(getPizzaDetailsSuccess(data)) : null);
    };
};

const getPizzaDetailsSuccess = (detail) => {
    return {
        type: GET_PIZZA_DETAIL,
        payload: detail
    };
};

export const clearPizzaDetails = () => {
    return {
        type: 'CLEAR_PIZZA_DETAILS'
    };
};
