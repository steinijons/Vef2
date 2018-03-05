import React from 'react';
//import { addToCart } from '../../actions/addToCartAction';
import { connect } from 'react-redux';
import { getAllPizzas } from '../../actions/pizzaActions';

//import Pizza from '../Pizza/Pizza';

class Cart extends React.Component {
    
};


const mapStateToProps = (reduxState) => {
    //console.log('the state: ' + reduxState);
    return {
        name: reduxState.name
    };
};

export default connect(mapStateToProps, { getAllPizzas })(Cart);
