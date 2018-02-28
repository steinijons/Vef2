import React from 'react';
import { PropTypes } from 'prop-types';
import PrivMsg from '../../PrivMsg/PrivMsg';

//import { enterRoom } from './ChatRoom';

class UserList extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        socket.on('userlist', (users) => {
            this.setState({ listUsers: users });
        })
        socket.emit('users');
    }
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            listUsers: []
        };
    }

    showList() {
        const { socket } = this.context;
        socket.emit('userlist', (userlist) => {
            console.log(userlist);
        });
        socket.emit('users');
    }

    render() {
        return (
            <div className="user-list">
                <div className="input-container">
                    <div />
                    <button type="button" className="btn" onClick={() => this.showList()}>Refresh user list</button>
                </div>
                <ul className="ul-list">
                    {this.state.listUsers.map(function(key) {
                        return <li className="list-item" key={key}>{key}</li>;
                    })}
                </ul>
                <PrivMsg />
            </div>

        );
    }
}

UserList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default UserList;
