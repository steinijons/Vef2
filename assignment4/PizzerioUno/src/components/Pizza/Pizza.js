import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/addToCartAction';


class Pizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pizza: {},
        };
        //this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    /*addToCartHandler(event) {
        const { pizza } = this.props;
        console.log('Pöntuð pizza: ' + pizza.name);
        event.preventDefault();
        this.setState = ({
            Pizza: pizza
        });
        this.props.addToCart(Pizza.);
    }*/

    render() {
        const { pizza } = this.props;
        
        return (
            <div className="pizza-wrapper">
                <div className="pizza-image">
                    <img src={pizza.image} alt=""/>
                </div>
                <div className="pizza-name">{pizza.name}</div>
                <div className="pizza-description">{pizza.description}</div>
                <div className="pizza-price">{pizza.price}</div>
                <button
                    type="button"
                    className="addPizzaToCartBtn"
                    //onClick={this.addToCartHandler}
                    onClick={()=>this.props.addToCart(pizza)}
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
    console.log( 'reduxState: ' + reduxState.pizza);
    return {
        Pizza: reduxState.pizza
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log('dispatch:' + dispatch);
    return {
        addToCart: pizza =>dispatch(addToCart(pizza))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pizza);
