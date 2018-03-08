import React from 'react';
import { PropTypes } from 'prop-types';
import SelectPizza from '../SelectPizza/SelectPizza';



class Offer extends React.Component {

    render() {
        const { offer } = this.props;
        const { id, offerItem, price, validFor } = offer;

        let item = null;

        if(id === 1) {
            item = <div className="select">
                <SelectPizza key={id} offerId={id}/>
                <SelectPizza key={id} offerId={id}/>
            </div>
        } else if(id === 2) {
            item =  <div className="select">
                <SelectPizza key={id} offerId={id}/>
                <SelectPizza key={id} offerId={id}/>
            </div>
        } else if(id === 3) {
            item = <div className="select">
                <SelectPizza key={id} offerId={id}/>
            </div>
        }

        return (
            <div className="container">
                <div className="offer-name">
                    <h3>{offerItem}</h3>
                </div>
                <div className="offer-price">{price}</div>
                <div className="offer-valid-for">{validFor}</div>
                {item}
                <button
                    type="button"
                    className="addPizzaToCartBtn"
                    // calls addToCart with a pizza object
                    onClick={()=>this.addToCart(id)}
                >
                    Add to cart
                </button>
            </div>
        );
    }

}

Offer.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};


export default Offer;
