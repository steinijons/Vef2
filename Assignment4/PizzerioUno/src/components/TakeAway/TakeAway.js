import React from 'react';
import TextInput from '../TextInput/TextInput';
//import toastr from 'toastr';
//import validator from 'validator';
import { connect } from 'react-redux';

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
        <div>{fullName}</div>
        //toastr.success('Form was successfully submitted', 'Success!');
    }
    render() {
        const { fullName, telephone} = this.state.fields;
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
                    <button type="submit" className="btn">Confirm</button>
                </form>
            </div>
        )
    };
};

export default connect(({ user }) => { return { user }; })(TakeAway);
