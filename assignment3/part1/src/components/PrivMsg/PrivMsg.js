import React from 'react';
import { PropTypes } from 'prop-types';

class PrivMsg extends React.Component {
    componentDidMount() {

        const { socket } = this.context;
        socket.on('recv_privatemsg', (userName, msg) => {
            console.log('recieved private msg from user: ', userName, ', message: ', msg);
            let allMesseges = this.state.messages;
            allMesseges.push(userName + ' - ' + msg);
            this.setState({ messages:allMesseges });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            user: ''
        };
    }
    sendMessage() {
        const { socket } = this.context;
        let msgObj = {
            nick: this.state.user,
            message: this.state.msg
        }
        this.setState({ msg: '' });
        socket.emit('privatemsg', msgObj, (sendMessage, error) => {
            if(sendMessage) {
                console.log('successfully sent message');
            }else {
                console.log(error);
            }
        });
    }

    render() {
        const { messages, msg, user } = this.state;
        return (
            <div className="private-chat-window">
                {messages.map(m => ( <div key={m}>{m}</div> ))}
                <div className="private-input-box">
                    <div className="input-container">
                        <input
                            type="text"
                            id = "user"
                            placeholder="User"
                            value={user}
                            className="input-box"
                            onInput={(f) => this.setState({ user: f.target.value })}/>
                        <input
                            type="text"
                            id = "msg"
                            placeholder="Message"
                            value={msg}
                            className="input-box"
                            onInput={(e) => this.setState({ msg: e.target.value })} />
                        <button type="button" className="btn" onClick={() => this.sendMessage()}>Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

PrivMsg.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default PrivMsg;
