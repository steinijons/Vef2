import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import Menu from './components/Menu/Menu';

const App = () => {
    return <Menu />;
};

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}><App /></Provider>, document.getElementById('app')
);
