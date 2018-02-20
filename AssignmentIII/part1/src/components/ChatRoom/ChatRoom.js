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

    enterRoom(val) {
        const { socket } = this.context;
        socket.emit('joinroom', {room: val, pass: this.state.pass}, (loggedIn, reason) => {
            console.log(loggedIn);
            if(!loggedIn) {
                console.log(reason);
            } else {
                this.setState({room: val});
            }
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
                    <input className="input-box" type="text" value={this.props.rooms} onChange={this.props.onChange} onInput= {(e) => this.setState({room: e.target.value})} />
                    <button className="btn" input="button" onClick={(e) => this.enterRoom(e.target.value)}>Join room</button>
                </div>
            </div>

        );
    }
};

ChatRoom.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatRoom;
