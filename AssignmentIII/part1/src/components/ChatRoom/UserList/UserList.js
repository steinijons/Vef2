import React from 'react';
import { PropTypes } from 'prop-types';
//import { enterRoom } from './ChatRoom';

class UserList extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        console.log('List of users');
        socket.on('userlist', (users) => {
            console.log('The user has been added to list');
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
        console.log(this.state.listUsers.Object);
        return (
            <div className="user-list">
                <ul className="ul-list">
                    {this.state.listUsers.map(function(key) {
                        return <li className="list-item" key={key}>{key}</li>;
                    })}
                </ul>
                <div className="input-container">
                    <div />
                    <button type="button" className="btn" onClick={() => this.showList()}>Refresh user list</button>
                </div>
            </div>
        );
    }
}

UserList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default UserList;
