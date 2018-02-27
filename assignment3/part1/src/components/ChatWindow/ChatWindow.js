import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        socket.on('roomlist', (rooms) => {
            this.setState({listRooms: rooms});
        })

        socket.on('currRoom', (room) => {
            this.setState({currentRoom: room});
        });

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
            currentRoom:'',
            listRooms: []
        };
    }

    leaveRoom() {
        console.log('leaveRoom');
        const { socket } = this.context;
        socket.emit('partroom', {room: this.state.currRoom});
    }

    sendMessage () {
        const { socket } = this.context;
        socket.emit('currentRoom');
        console.log('roomName: ' + this.state.currentRoom);
        const data = {msg: this.state.msg, roomName: this.state.currentRoom};
        console.log(data);
        socket.emit('sendmsg', data);
        this.setState({msg: '' });

    }

    render() {
        return (
            <div className="chat-window">
                <div className="chat-window-upper">
                    <div className="input-container">
                        <h3 className="chat-header">{this.state.currentRoom}</h3>
                        <button type="button" className="btn" onClick={() => this.leaveRoom()}>Leave room</button>
                    </div>
                    <div id="messages" className="chat-messages">
                    {this.state.messages.map(m => ( <div key={m.timestamp}>{new Date(m.timestamp).toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
                    </div>
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
