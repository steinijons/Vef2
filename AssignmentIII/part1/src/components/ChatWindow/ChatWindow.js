import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        socket.on('updatechat', (room, messageObj) => {
            this.setState({messages: messageObj});
        });
    }
    componentDidUpdate() {
        const messageContainer = document.getElementById('messages');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            roomName: '',
        };
    }

    sendMessage () {
        const { socket } = this.context;
        const data = {msg: this.state.msg, roomName: 'eyjar.is'};
        socket.emit('sendmsg', data);
        this.setState({msg: '' });
    }
    render() {
        return (
            <div className="chat-window">
            <div id="messages" className="chat-messages">
                {this.state.messages.map(m => ( <div key={m.nick}>{new Date().toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
            </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={this.state.msg}
                        className="input-box"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="btn" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;
