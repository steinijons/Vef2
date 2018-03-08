import React from 'react';
import TextInput from '../TextInput/TextInput';
//import toastr from 'toastr';
//import validator from 'validator';
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
        //toastr.success('Form was successfully submitted', 'Success!');
    }
    render() {
        const { fullName, telephone, zip, address, city } = this.state.fields;
        return (
            <div className="container">
                <form action="" method="get" onSubmit={(e) => this.onFormSubmit(e)}>
                    <div className="input-fields">Name</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="fullName"
                        value={fullName}
                        validate={val => !val ? formValidation.fullNameReq : ''} />
                    <div className="input-fields">Phone number</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="telephone"
                        value={telephone}
                        validate={val => !val ? formValidation.telephoneReq : ''} />
                    <div className="input-fields">Address</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="address"
                        value={address}
                        validate={val => !val ? formValidation.addressReq : ''} />
                    <div className="input-fields">Postal code</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="zip"
                        value={zip}
                        validate={val => !val ? formValidation.zipReq : ''} />
                    <div className="input-fields">City</div>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="city"
                        value={city}
                        validate={val => !val ? formValidation.cityReq : ''} />
                    <button type="submit" className="btn">Confirm</button>
                </form>
            </div>
        )
    };
};

export default connect(({ user }) => { return { user }; })(Delivered);
