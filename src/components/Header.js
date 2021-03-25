import React, { useState } from 'react';
import { Navbar, Jumbotron, Form, FormGroup, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header(){
    return (
        <div>
            <Jumbotron fluid>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Velp <img src="logo.jpg" height={40} alt="logo" /></h1>
                            <h2>Pretend your review matters</h2>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Navbar dark sticky="top">
                <div className="navbar-container">
                    <NavLink className="nav-link" to="/">
                        Home
                    </NavLink>
                    <NavLink className="nav-link" to="/restaurant">
                        Restaurants
                    </NavLink>
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </div>
            </Navbar>
        </div>
    )
}

export default Header;