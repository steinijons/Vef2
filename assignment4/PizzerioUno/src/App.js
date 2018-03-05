import React from'react';
import ReactDOM from 'react-dom';
import { Provider, /*connect*/ } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import Menu from './components/Menu/Menu';
import NavigationBar from './components/NavigationBar/NavigationBar';
import About from './components/About/About';
import Offers from './components/Offers/Offers';
import PizzaDetail from './components/PizzaDetail/pizzaDetail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';


class App extends React.Component {
    /*componentDidMount() {
        this.props.getCurrentPizza();
    }*/

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="container">
                    <Switch>
                        <Route exact path='/pizzas' component={Menu} ></Route>
                        <Route path='/pizzas/:pizzaId' component={PizzaDetail}></Route>
                        <Route path='/Offers' component={Offers} ></Route>
                        <Route path='/About' component={About} ></Route>
                        <Route path='/Cart' component={Cart} ></Route>
                    </Switch>
                </div>
            </div>
        );
    };
};

//const AppWithRedux = connect(null, { getCurrentPizza})(App);

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app')
);