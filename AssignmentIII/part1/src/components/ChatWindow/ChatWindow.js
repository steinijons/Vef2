
import React from 'react';
import { PropTypes } from 'prop-types';


class ChatWindow extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('msg', (msg)=> {
            // Update the message state
            let messages = Object.assign([], this.state.messages);
            messages.push(`${(new Date()).toLocaleTimeString()} - ${msg} `) ;
            this.setState({ messages });
        });
    }
    componentDidUpdate() {
        const messageContainer = document.getElementById('messages');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            msg: '',
            messages: []
        };
    }
    sendMessage() {
        const { socket } = this.context;
        socket.emit('msg', this.state.msg);
        this.setState({ msg: '' });
    }
    render() {
        const { messages, msg } = this.state;
        return (
            <div className="chat-window">
                <div id="messages" className="chat-messages">
                    {messages.map(m => ( <div key={m}>{m}</div> ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={msg}
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
