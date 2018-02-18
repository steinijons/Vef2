import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import '../styles/site.less';
import socketClient from 'socket.io-client';
import '../styles/site';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Login from './components/Login/Login';
import RoomList from './components/ChatRooms/RoomList/RoomList';

class App extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    render() {
        return (
            <div className="container">
                <Login/>
                <ChatRoom/>
                <RoomList/>
                <ChatWindow/>
            </div>
        );
    };
};
App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
