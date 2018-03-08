import React from 'react';
import { PropTypes } from 'prop-types';
import CartRemove from '../CartRemove/CartRemove';


class CartItem extends React.Component {

    render() {
        const  { CartItem } = this.props;
        const { name, description, price, image } = CartItem;
        var sum = sum + price
        return (
            <div className="pizza-wrapper">
                <div className="pizza-image">
                    <img src={image} alt=""/>
                </div>
                <div className="pizza-name">{name}</div>
                <div className="pizza-description">{description} kr</div>
                <div className="pizza-price">{price}</div>
                <CartRemove key={CartItem} pizza={CartItem}/>
            </div>
        );
    }

}

CartItem.propTypes = {
    offer: PropTypes.shape({
        id: PropTypes.number,
        offerItem: PropTypes.string,
        price: PropTypes.number,
        validFor: PropTypes.string
    })
}

export default CartItem;
