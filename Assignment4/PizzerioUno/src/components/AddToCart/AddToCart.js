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

    addToCart(event) {
        const { pizza } = this.props;
        console.log('pöntuð pizza ' + pizza.name);
        event.preventDefault();
        this.setState = ({
            Pizza: pizza
        });
        this.props.addToCart(Pizza)
    }
    render () {
        const { pizza } = this.props;
        //console.log('pizzaProps:' + pizza);
        return (
            <div className="addPizzaToCartBtn">
                <button
                    type="button"

                    //onClick={this.addToCartHandler
                    onClick={()=>this.addToCart(pizza)}
                >
                    Add to cart
                </button>
            </div>
        );
    }
};

const mapStateToProps = (reduxState) => {
    //console.log('addtocartState: ' + reduxState.name);
    return {
        pizza: reduxState.pizza
    };
};

export default connect(null, mapStateToProps)(AddToCart);
