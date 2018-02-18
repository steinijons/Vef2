import React from 'react';
import { PropTypes } from 'prop-types';
// Connecting to lobby

class ChatRoom extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        console.log('List of Rooms');
        socket.on('roomlist', (room) => {
            console.log('Oh, squiggly line in my eye fluid.');
            let rooms = Object.assign([], this.state.listRooms);
            rooms.push(room);
            this.setState({ rooms })
        });
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
        socket.emit('joinroom', {room: this.state.room, pass: this.state.pass}, (loggedIn) => {
            console.log(loggedIn);
        });
    }
    render() {
        const { listRooms } = this.state.listRooms;
        console.log(rooms);
        var rooms = this.state.listRooms.length ? listRooms.map(m => (<div> {m} </div>)) : '';
        return (
            <div className="room-Window">
                <input type = "text"  onInput = {(e) => this.setState({room: e.target.value})} />
                <button input="button" onClick={() => this.enterRoom()}>Rooms</button>
                <div>
                    { rooms }
                </div>
            </div>
        );
    }
};

ChatRoom.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatRoom;
