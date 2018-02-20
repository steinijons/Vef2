import React from 'react';
import { PropTypes } from 'prop-types';
import UserList from '../ChatRoom/UserList/UserList';
//import ChatWindow from '../ChatWindow/ChatWindow';
import ChatRoom from '../ChatRoom/ChatRoom';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            error: '',
            loggedIn: false
        };
        this.submitHandler = this.submitHandler.bind(this);
    }
    // Handles input from user
    // reference: piazza https://piazza.com/class/jbzjs3mbfgb4oq?cid=129
    submitHandler() {
        event.preventDefault();
        let {socket} = this.context;
        const {nickname, loggedIn} = this.state;
        if (nickname === '') return;
        if (loggedIn) {
            this.setState({loggedIn: false});
            //TODO: kalla á server og disconnecta userinn
        }
        // emits the nickname from user, error = empty string
        socket.emit('adduser', nickname, function (available) {
            if(available) {
                console.log('avaliable!');
                this.setState({nickname, error: ''});
                this.setState({loggedIn: true});
            } else {
                console.log('sorry stína');
                this.setState({ error: 'Nick in use. Find another one!'});
            }
        }.bind(this));
        console.log(nickname);
    };

    render() {
        const {nickname, error, loggedIn} = this.state;

        return [
            <div className="login-window" key="login1">
                {error !== '' &&
                    <span className="error-in-header">{error}</span>
                }
                <div className="input-container">

                    {!loggedIn &&
                        <input
                            id="nick"
                            type="text"
                            className="input-box"
                            placeholder="Nickname here..."
                            value={nickname}
                            onInput={n => this.setState({nickname: n.target.value})}/>
                    }
                    {loggedIn && <span className="logged-in-text">Logged in as {nickname}</span>}
                    <button
                        id="nickInput"
                        type="submit"
                        className="btn"
                        onClick={()=> this.submitHandler()}>
                        {!loggedIn ? 'Connect' : 'Disconnect'}
                    </button>
                </div>
            </div>,
            loggedIn && <div className="main-row" key="login2">
                <ChatRoom />
                <UserList />
            </div>
        ];
    }
};
Login.contextTypes = {
    socket: PropTypes.object.isRequired,
};
export default Login;
