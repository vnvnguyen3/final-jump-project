import React, { Component } from 'react';
import { Navbar, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    render(){
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
                        <NavLink className="nav-link" to={`/users/${this.props.user.userName}`}>
                            {this.props.user.userName}
                        </NavLink>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default Header;