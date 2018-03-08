import React from 'react';
import { connect } from 'react-redux';
import Pizza from '../Pizza/Pizza';
import { getAllPizzas } from '../../actions/pizzaActions';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }
    render() {
        const { pizza } = this.props;
        return (
            <div className="menu-pizza-container">
                <div className="menu-checkout">
                    <Link to='Menu/Checkout'>
                        <button
                            type="button"
                            className="checkout-button"
                        >
                            Check out!
                        </button><
                    /Link>
                </div>
                {pizza.map(p => <Pizza key={p.id} pizza={p} />)}
            </div>
        );
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza }
};

export default connect(mapStateToProps, { getAllPizzas })(Menu);
