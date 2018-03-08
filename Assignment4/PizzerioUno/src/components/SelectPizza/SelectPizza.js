import React from 'react';
import { connect } from 'react-redux';
import { getAllPizzas } from '../../actions/pizzaActions';

class SelectPizza extends React.Component {

    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }

    render() {
        const { pizza } = this.props;

        return (
            <div className="pizza-selection-wrapper">
                <select className="select">
                    {pizza.map(p => <option value={p.id}>{p.name}</option> )}
                </select>
            </div>
        );
    }
};

const mapStateToProps = ({ pizza }) => {
    return { pizza }
};


export default connect(mapStateToProps, { getAllPizzas })(SelectPizza);
