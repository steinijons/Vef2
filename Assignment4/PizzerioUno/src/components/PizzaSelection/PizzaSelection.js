import React from 'react';
import SelectPizza from '../SelectPizza/SelectPizza';

class PizzaSelection extends React.Component {

    render() {
        const { pizza } = this.props;
        console.log('pizzaselection ' + pizza);

        return (
            <div className="pizza-selection-wrapper">
                <select className="select">
                    <option value={offerItem}>{offerItem}</option> ))}
                </select>
            </div>
        );
    }
}

export default PizzaSelection;
