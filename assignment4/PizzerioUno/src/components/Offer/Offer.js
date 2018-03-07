import React from 'react';
import { PropTypes } from 'prop-types';

const Offer = ({ offer }) => {
    const { offerItem, price, validFor } = offer;

    return (
        <div className="container">
            <div className="offer-name">{offerItem}</div>
            <div className="offer-price">{price} kr</div>
            <div className="offer-valid-for">{validFor}</div>
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
