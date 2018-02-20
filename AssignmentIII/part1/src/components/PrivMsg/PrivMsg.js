import React from 'react';
import { PropTypes } from 'prop-types';

class PrivMsg extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        socket.on('userlist', (users) => {
            this.setState({ listUsers: users });
        })
        
        socket.on('recv_privatemsg', (nick, message) => {
            this.setState({messages: message});
        });

    }
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            nick: '',
            messages: '',
            listUsers: []
        };
    }

    chatToUser() {
        const { socket } = this.context;
        let data = {msg: this.state.msg, nick: this.state.user};
        socket.emit('privatemsg', data,  (available) => {
            if(available) {
                console.log('message sent');
            }
            else {
                console.log('message not send');
            }
        });
        //this.setState({msg: ''});
    }

    render() {
        return (
            <div className="user-list">
                <div className="input-container">
                    <div className="input-container">
                        <input className="input-box" placeholder="Insert user to chat with" type="text"  onInput= {(e) => this.setState({user: e.target.value})} />
                        <button className="btn" input="button" onClick={() => this.chatToUser()}>Chat to user</button>
                    </div>
                    <div />
                </div>
            </div>
        );
    }
}

PrivMsg.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default PrivMsg;
