import React from 'react';
import { PropTypes } from 'prop-types';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            message: []
        };
    }

    render() {
        const { socket } = this.context;
        socket.emit('msg', this.state.msg);
        this.setState({msg: ''});
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;
