import React from'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import Menu from './components/Menu/Menu';
import NavigationBar from './components/NavigationBar/NavigationBar';
import About from './components/About/About';
import Offers from './components/Offers/Offers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <NavigationBar/>
            <div className="container">
                <Switch>
                    <Route exact path='/'component={Menu} ></Route>
                    <Route path='/Offers'component={Offers} ></Route>
                    <Route path='/About' component={About} ></Route>
                </Switch>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app')
);
