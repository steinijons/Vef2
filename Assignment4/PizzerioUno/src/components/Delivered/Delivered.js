import React from 'react';
import TextInput from '../TextInput/TextInput';
import validator from 'validator';
import toastr from 'toastr';
import { connect } from 'react-redux';

const initialState = {
    fields: {
        fullName: '',
        telephone: '',
        address: '',
        city: '',
        zip: ''
    }
};

class Delivered extends React.Component {
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
        const { fullName, telephone, city, address, zip, } = this.state.fields;
        if (fullName === '' || telephone === '' || city === '' || address === '' || zip === '') { return false; }
        console.log(this.state.fields);
        this.setState(initialState);
        localStorage.clear();
        toastr.success('Form was successfully submitted', 'Success!');
    }
    render() {


        const { fullName, telephone, zip, address, city } = this.state.fields;
        return (
            <div className="deliverContainer">
                <div className="formcontainer">
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
                        <div className="input-fields">Address</div>
                        <TextInput
                            onChange={e => this.onInput(e)}
                            name="address"
                            value={address}
                            validate={val => !validator.isEmpty(val) ? 'Your address!' : ''} />
                        <div className="input-fields">Postal code</div>
                        <TextInput
                            onChange={e => this.onInput(e)}
                            name="zip"
                            value={zip}
                            validate={val => !val ? validator.isPostalCode(val, 'IS') : ''} />
                        <div className="input-fields">City</div>
                        <TextInput
                            onChange={e => this.onInput(e)}
                            name="city"
                            value={city}
                            validate={val => !val ? formValidation.cityReq : ''} />
                        <button type="submit" className="btn">Confirm</button>
                        <div className="cart-container">
                            <div className="cart-pizza-wrapper">
                                <h3>Your order below!</h3>
                                {oldItems.map(p => <CartItem key={p.id} CartItem={p} />)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    };
};

export default connect(({ user }) => { return { user }; })(Delivered);
