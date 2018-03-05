import React from 'react';
import { connect } from 'react-redux';
import { getAllPizzas } from '../../actions/pizzaActions';
//import { addToCart } from '../../actions/addToCartAction';

class pizzaDetail extends React.Component {

    componentDidMount() {
        const { pizzaId } = this.props.match.params;
        const { getAllPizzas } = this.props;
        getAllPizzas().then(pizza => {
            var pizzaObjects = pizza.payload;
            for (var i=0; i < pizzaObjects.length; i++) {
                if (parseInt(pizzaObjects[i].id) == pizzaId) {
                    this.setState({ pizzaDetail: pizzaObjects[i] });
                }
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = { pizzaDetail: {}};
    }

    render() {
        const { name, description, price, image  } = this.state.pizzaDetail;

        return (
            <div className="pizza-wrapper">
                <div className="pizza-image">
                    <img src={image} alt=""/>
                </div>
                <div className="pizza-description">{name}</div>
                <div className="pizza-description">{description}</div>
                <div className="pizza-price">{price}</div>
                <button
                    type="button"
                    className="addPizzaToCartBtn"
                    // calls addToCart with a pizza object
                    onClick={()=>this.props.addToCart()}
                >
                    Add to cart
                </button>
            </div>
        )
    }
};




const mapStateToProps = ({ pizza }) => {
    return { pizza }
};


export default connect(mapStateToProps, { getAllPizzas })(pizzaDetail);
