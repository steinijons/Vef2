import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pizza from '../Pizza/Pizza'

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: {}
        };
        this.addToCart = this.addToCart.bind(this);
    };

    addToCartHandler(event) {
        const { pizza } = this.props;
        console.log('pöntuð pizza ' + pizza.name);
        event.preventDefault();
        this.setState = ({
            Pizza: pizza
        });
        this.props.addToCart(Pizza);
    }

    addToCart(id) {
        console.log(id);
        var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];

        var newItem = {
            'pizza-id': id
        };

        oldItems.push(newItem);
        console.log(oldItems);

        localStorage.setItem('cartArray', JSON.stringify(oldItems));
    }

    render () {
        console.log('inside AddToCart');
        const { pizza } = this.props;
        return (
            <div className="addPizzaToCartBtn">
                <button
                    type="button"
                    //onClick={this.addToCartHandler}
                    onClick={()=>this.addToCart(pizza.id)}>Add to cart
                </button>
            </div>
        );
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza }
};

export default connect(null, mapStateToProps)(AddToCart);
