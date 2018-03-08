import React from 'react';
import TextInput from '../TextInput/TextInput';
//import toastr from 'toastr';
//import validator from 'validator';
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem';

const initialState = {
    fields: {
        fullName: '',
        telephone: ''
    }
};

class TakeAway extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };
    onInput(e) {
        let fields = Object.assign({}, this.state.fields);
        fields[e.target.name] = e.target.value;
        this.setState({ fields });
    };
    onFormSubmit(e) {
        e.preventDefault();
        const { fullName, telephone} = this.state.fields;
        if (fullName === '' || telephone === '') { return false; }
        console.log(this.state.fields);
        this.setState(initialState);
        localStorage.clear();
        //toastr.success('Form was successfully submitted', 'Success!');
    }
    render() {
        var oldItems = JSON.parse(localStorage.getItem('cartArray')) || [];
        const { fullName, telephone} = this.state.fields;
        return (
            <div className="container">
                <form action="" method="get" onSubmit={(e) => this.onFormSubmit(e)}>
                    <div className="input-fields">Name</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="fullName"
                        value={fullName}
                        validate={val => !validator.isEmpty(val) ? 'Your name please' : ''} />
                    <div className="input-fields">Phone number</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="telephone"
                        value={telephone}
                        validate={val => !validator.isNumberic(val) ? 'Your phone number please' : ''} />
                    <button type="submit" className="btn">Confirm</button>
                    <div className="cart-container">
                        <div className="cart-pizza-wrapper">
                            <h3>Your order!</h3>
                            {oldItems.map(p => <CartItem key={p.id} CartItem={p} />)}
                        </div>
                    </div>
                </form>
            </div>
        )
    };
};

export default connect(({ user }) => { return { user }; })(TakeAway);
