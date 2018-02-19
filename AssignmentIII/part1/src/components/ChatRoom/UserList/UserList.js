import React from 'react';
import { PropTypes } from 'prop-types';

class UserList extends React.Component {

    componentDidMount() {
        const { socket } = this.context;
        console.log('List of users');
        socket.on('userlist', (user) => {
            let users = Object.assign([], this.state.listUsers);
            users.push(user);
            this.setState({ users })
        });
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
        socket.emit('userlist', (loggedIn) => {
            console.log(loggedIn);
        });
    }
    render() {
        const { listUsers } = this.state.listUsers;
        console.log(users);
        var users = this.state.listUsers.length ? listUsers.map(m => (<div> {m} </div>)) : '';
        return (
            <div className="user-list">
                { users }
            </div>
        );
    }
}

UserList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default UserList;
