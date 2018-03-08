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
import PizzaDetail from './components/PizzaDetail/pizzaDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Delivered from './components/Delivered/Delivered';
import TakeAway from './components/TakeAway/TakeAway';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <NavigationBar/>
            <div className="container">
                <Switch>
                    <Route exact path='/pizzas' component={Menu}></Route>
                    <Route path='/pizzas/:pizzaId' component={PizzaDetail}></Route>
                    <Route path='/Offers' component={Offers}></Route>
                    <Route path='/About' component={About}></Route>
                    <Route exact path='/Cart' component={Cart}></Route>
                    <Route path='/Cart/Checkout' component={Checkout}></Route>
                    <Route path='/Menu/Checkout' component={Checkout}></Route>
                    <Route exact path='/Checkout/Delivered' component={Delivered}></Route>
                    <Route exact path='/Checkout/TakeAway' component={TakeAway}></Route>
                </Switch>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app')
);
