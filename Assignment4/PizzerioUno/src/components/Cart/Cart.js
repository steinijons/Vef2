import React from 'react';
//import { addToCart } from '../../actions/addToCartAction';
import { connect } from 'react-redux';
//import Pizza from '../Pizza/Pizza';

const Cart = (props) => {
    console.log('karfa: ' + props);
    return (
        <div className="container">
            <p>Karfan þín</p>
            <div className="container">{props.name}</div>
        </div>
    );
};


const mapStateToProps = (reduxState) => {
    //console.log('the state: ' + reduxState);
    return {
        name: reduxState.name
    };
};

export default connect(mapStateToProps)(Cart);
