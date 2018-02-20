import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        socket.on('updatechat', (room, messageObj) => {
            this.setState({messages: messageObj, roomName: room});
        });
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
        const data = {msg: this.state.msg, roomName: this.state.roomName};
        console.log(data);
        socket.emit('sendmsg', data);
        this.setState({msg: '' });
    }
    render() {
        return (
            <div className="chat-window">
                {this.state.messages.map(m => ( <div key={m.nick}>{new Date().toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        value={this.state.msg}
                        className="input input-big"
                        onInput={(e) => this.setState({ msg: e.target.value })} />
                    <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;
