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
                <div className="nav-logo">
                    <h2>Pizzeria Uno</h2>
                </div>
                <NavigationBarLinkWrapper>
                    <NavLink
                        exact
                        to="/"
                        activeClassName="active"
                        className="nav-link"
                        value="Menu">Menu</NavLink>
                    <NavLink
                        to="/Offers"
                        activeClassName="active"
                        className="nav-link">Offers</NavLink>
                    <NavLink
                        to="/About"
                        activeClassName="active"
                        className="nav-link"
                        value="About">About Us</NavLink>
                </NavigationBarLinkWrapper>
            </div>
        );
    }
};
