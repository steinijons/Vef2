import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/addToCartAction';
//import { addToCart } from '../AddToCart/AddToCart';


class Pizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: {},
        };
    }

    //Stores items in localStorage
    addToCart(pizza) {
        var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];

        oldItems.push(pizza);

        localStorage.setItem('cartArray', JSON.stringify(oldItems));
    }

    render() {
        const { pizza } = this.props;

        return (
            <div className="pizza-wrapper">
                <div className="pizza-image">
                    <img src={pizza.image} alt=""/>
                </div>
                <div className="pizza-name">
                    <h3><Link to={`/pizzas/${pizza.id}`}>{pizza.name}</Link></h3>
                </div>
                <div className="pizza-description">{pizza.description}</div>
                <div className="pizza-price">{pizza.price} kr</div>
                <button
                    type="button"
                    className="addPizzaToCartBtn"
                    // calls addToCart with a pizza object
                    onClick={()=>this.addToCart(pizza)}
                >
                    Add to cart
                </button>
            </div>
        );
    }
};

Pizza.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

const mapStateToProps = (reduxState) => {
    //console.log( 'reduxState: ' + reduxState.pizza);
    return {
        Pizza: reduxState.pizza
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log('dispatch:' + dispatch);
    return {
        addToCart: pizza =>dispatch(addToCart(pizza))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pizza);
