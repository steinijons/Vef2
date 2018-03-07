import React from 'react';
//import TextInput from '../TextInput/TextInput';
//import CountrySelection from '../CountrySelection/CountrySelection';
import toastr from 'toastr';
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

class User extends React.Component {
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
        toastr.success('Form was successfully submitted', 'Success!');
    }
    render() {
        const { fullName, telephone, zip, address, city } = this.state.fields;
        const { headings, formValidation, buttons } = this.props.language;
        return (
            <div>
                <h1>{headings.signupNow}</h1>
                <form action="" method="get" onSubmit={(e) => this.onFormSubmit(e)}>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="fullName"
                        value={fullName}
                        validate={val => !val ? formValidation.fullNameReq : ''} />
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="telephone"
                        value={telephone}
                        validate={val => !val ? formValidation.telephoneReq : ''} />
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="city"
                        value={city}
                        validate={val => !val ? formValidation.cityReq : ''} />
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="address"
                        value={address}
                        validate={val => !val ? formValidation.addressReq : ''} />
                    <CountrySelection onCountrySelection={e => this.onInput(e)} />
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="zip"
                        value={zip}
                        validate={val => !val ? formValidation.zipReq : ''} />
                    <button type="submit" className="btn">{buttons.submit}</button>
                </form>
            </div>
        )
    };
};

export default connect(({ language }) => { return { language }; })(User);
