import React from 'react';
import { PropTypes } from 'prop-types';
// Connecting to lobby

class ChatRoom extends React.Component {


    /*socket.on('rooms', function() {
		socket.emit('roomlist', rooms);
		console.log(rooms);
	});*/

    componentDidMount() {
        const { socket } = this.context;
        socket.on('roomlist', (rooms) => {
            console.log('Oh, squiggly line in my eye fluid.');
            this.setState({listRooms: rooms});
        })
        socket.emit('rooms');
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
        socket.emit('rooms');
    }
    render() {
        return (
            <div className="room-Window">
                <ul className="ul-list">
                    {Object.keys(this.state.listRooms).map(function(key) {
                        return <li className="list-item" key={key}>{key}</li>;
                    })}
                </ul>
                <div className="input-container">
                    <input className="input-box" type="text"  onInput= {(e) => this.setState({room: e.target.value})} />
                    <button className="btn" input="button" onClick={() => this.enterRoom()}>Add room</button>
                </div>
            </div>

        );
    }
};

ChatRoom.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatRoom;
