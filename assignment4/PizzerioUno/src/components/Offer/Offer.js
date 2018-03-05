import React from 'react';
import { PropTypes } from 'prop-types';

const Offer = ( {offer}) => {
    const { id, offerItem, price, validFor } = offer;

    return (
        <div className="offer-wrapper">
            <div className="offer-id">{id}</div>
            <div className="offer-name">{offerItem}</div>
            <div className="offer-price">{price}</div>
            <div className="offer-valid-for">{validFor}</div>
            <button type="button" className="addPizzaToCartBtn">Add to cart</button>

        </div>
    );
};

Offer.propTypes = {
    offer: PropTypes.shape({
        id: PropTypes.number,
        offerItem: PropTypes.string,
        price: PropTypes.number,
        validFor: PropTypes.string
    })
}

export default Offer;
