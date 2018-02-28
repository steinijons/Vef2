import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';

const App = () => {
    return <h1>Welcome to my app!</h1>
};

ReactDOM.render(<Provider store=(createStore(reducers))><App /></Provider> , document.getElementById('app'));
