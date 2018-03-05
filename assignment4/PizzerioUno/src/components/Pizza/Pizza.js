import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
class Pizza extends React.Component {


    render() {
        const { pizza } = this.props
        const { id, name, description, price, image } = pizza;
        return (
            <div className="pizza-wrapper">
                <div className="pizza-image">
                    <img src={image} alt=""/>
                </div>
                <div className="pizza-name">
                    <h3><Link to={`/pizzas/${id}`}>{name}</Link></h3>
                </div>
                <div className="pizza-description">{description}</div>
                <div className="pizza-price">{price}</div>
            </div>
        );

    }

}

Pizza.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default Pizza;
