import React from 'react';
//import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
//import { connect } from 'react-redux';
import NavigationBarLinkWrapper from '../NavigationBarLinkWrapper/NavigationBarLinkWrapper';
//import SelectLanguage from '../SelectLanguage/SelectLanguage';

export default class NavigationBar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <img src='./././img/PizzaLogo1.png'/>
                <NavigationBarLinkWrapper>
                    <NavLink
                        exact
                        to="/pizzas"
                        activeClassName="active"
                        className="nav-link"
                        value="Menu">Menu</NavLink>
                    <NavLink
                        to="/Offers"
                        activeClassName="active"
                        className="nav-link"
                        value="Offers">Offers</NavLink>
                    <NavLink
                        to="/About"
                        activeClassName="active"
                        className="nav-link"
                        value="About">About Us</NavLink>
                    <NavLink
                        to="/Cart"
                        activeClassName="active"
                        className="nav-link"
                        value="Cart">Cart</NavLink>
                </NavigationBarLinkWrapper>
            </div>
        );
    }
};
