import React from 'react';
import { PropTypes } from 'prop-types';

class RoomList extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('roomlist', (roomlist) => {
            let listRooms = Object.assign([], this.state.listRooms);
            listRooms.push(`${roomlist}`);
            this.setState({ listRooms });
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            roomlist: '',
            listRooms: []
        };
    }
    showList() {
        const { socket } = this.context;
        socket.emit('roomlist', this.state.roomlist);
        this.setState({ roomlist: '' });
    }
    render() {
        const { listRooms, roomlist } = this.state;
        console.log(listRooms);
        return (
            <div className="room-list">
                <ul>
                    {listRooms.map(l => (<li key={l}>{l}</li> ))}
                </ul>
                <div className="input-form">
                <h2>rooms</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Room Name"
                            value={roomlist}
                            className="input-form"
                            onInput={(e) => this.setState({ roomlist: e.target.value})} />
                        <button type="submit" className="btn" onClick={() => this.showList()}>Create</button>
                    </form>
                </div>
            </div>
        );
    }

};

RoomList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default RoomList;
