import React from 'react';
import { PropTypes } from 'prop-types';
import ChatWindow from '../ChatWindow/ChatWindow';
// Connecting to lobby

class ChatRoom extends React.Component {


    componentDidMount() {
        const { socket } = this.context;
        socket.on('roomlist', (rooms) => {
            this.setState({listRooms: rooms});
        })
        socket.emit('rooms');
        socket.emit('currentRoom');
    }
    constructor(props) {
        super(props);
        this.state = {
            room:'',
            pass:'',
            listRooms: []

        };
    }

    enterRoom() {
        const { socket } = this.context;
        socket.emit('currentRoom');
        socket.emit('joinroom', {room: this.state.room, pass: this.state.pass}, (loggedIn) => {
            console.log(loggedIn);
            if(!loggedIn) {
                console.log(reason);
            } else {
                console.log('successfull created or joined room');
            }
        });
        socket.emit('currentRoom');
        socket.emit('rooms');
    }

    render() {
        return [
            <div className="room-Window">
                <ul className="ul-list">
                    {Object.keys(this.state.listRooms).map(function(key) {
                        return <li className="list-item" key={key}>{key}</li>;
                    })}
                </ul>
                <div className="input-container">
                    <input className="input-box" type="text"  onInput= {(e) => this.setState({room: e.target.value})} />
                    <button className="btn" input="button" onClick={() => this.enterRoom()}>Add/Join room</button>
                </div>
            </div>,
            <ChatWindow/>
        ];
    }
};

ChatRoom.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatRoom;
