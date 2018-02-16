import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import socketClient from 'socket.io-client';
import ChatWindow from './components/ChatWindow/ChatWindow';
import '../styles/site';

class App extends React.Component {

    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        }
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ChatWindow/>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
