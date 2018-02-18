import React from 'react';
import { PropTypes } from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            err: '',
        };
    }
    // Handles input from user
    submitHandler() {
        const {socket} = this.context;
        const {nickname} = this.state;
        // emits the nickname from user, error = empty string
        socket.emit('adduser', {nickname: this.state, err: ''});
    }

    render() {
        const {nickname, err} = this.state;
        return (
            <div className="login-window">
                <div className="input-box">
                    <input
                        type="text"
                        className="input input-big"
                        placeholder="Nickname here..."
                        value={nickname}
                        onInput={n => this.setState({nickname: n.target.value})}/>
                    <button type="button" className="btn pull-rigth" onClick={()=> this.submitHandler()}>Submit</button>
                </div>
            </div>
        );
    }
};
Login.contextTypes = {
    socket: PropTypes.object.isRequired,
};
export default Login;
