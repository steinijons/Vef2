import React from 'react';
import { connect } from 'react-redux';
import Pizza from '../Pizza/Pizza';
//import { getAllPizzas } from '../../actions/pizzaActions';
import { getPizzaDetailsById } from '../../actions/pizzaActions';
//import { addToCart } from '../../actions/addToCartAction';

class pizzaDetail extends React.Component {

    componentDidMount() {
        const { pizzaId } = this.props.match.params;
        const { getPizzaDetailsById } = this.props;
        getPizzaDetailsById(pizzaId);
    }


    render() {
        const { pizza } = this.props;
        return (
            <div className="pizza-wrapper">
                <div className="pizza-container">{
                    <Pizza key={pizza} pizza={pizza} />
                }
                </div>
            </div>

        )
    }
};

const mapStateToProps = (state) => {
    return { pizza: state.pizzaDetail }
};

export default connect(mapStateToProps, { getPizzaDetailsById })(pizzaDetail);
