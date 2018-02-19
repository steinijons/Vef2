import React from 'react';
import { PropTypes } from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            error: ''
        };
        this.submitHandler = this.submitHandler.bind(this);
    }
    // Handles input from user
    // reference: piazza https://piazza.com/class/jbzjs3mbfgb4oq?cid=129
    submitHandler() {
        event.preventDefault();
        const {socket} = this.context;
        const {nickname} = this.state;
        // emits the nickname from user, error = empty string
        socket.emit('adduser', nickname, function (available) {
            if(available) {
                console.log('avaliable!');
                this.setState({nickname, error: ''});
            } else {
                console.log('sorry stína');
                this.setState({ error: 'Nick in use. Find another one!'});
            }
        }.bind(this));
        console.log(nickname);
    };

    render() {
        const {nickname, error} = this.state;

        return (
            <div className="login-window">
                <div className="input-box">
                    <input
                        id="nick"
                        type="text"
                        className="input input-big"
                        placeholder="Nickname here..."
                        value={nickname}
                        onInput={n => this.setState({nickname: n.target.value})}/>
                    <button type="submit" className="btn" onClick={()=> this.submitHandler()}>Submit</button>
                </div>
                {error !== '' &&
                    <span>{error}</span>
                }
            </div>
        );
    }
};
Login.contextTypes = {
    socket: PropTypes.object.isRequired,
};
export default Login;
