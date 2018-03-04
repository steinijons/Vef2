import React from 'react';
import { connect } from 'react-redux';
import Offer from '../Offer/Offer';
import { getAllOffers } from '../../actions/pizzaActions';

class Offers extends React.Component {
    componentDidMount() {
        const { getAllOffers } = this.props;
        getAllOffers();
    }


    render() {
        const { offer } = this.props;
        var propValue;
        for (var p in offer) {
            propValue = offer[p];
            console.log('item',p,propValue.offerItem);
        }
        console.log(offer[0]);
        return (
            <div className="container">
                <div className="offer">
                    {offer.map(p => <Offer key={p.id} offer={p} />)}
                </div>
            </div>
        );
    }
};

const mapStateToProps = ({ offer }) => {
    return { offer }
};

export default connect(mapStateToProps, { getAllOffers })(Offers);
//{this.state.messages.map(m => ( <div key={m.timestamp}>{new Date(m.timestamp).toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
