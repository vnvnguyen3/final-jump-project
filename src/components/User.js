import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor(){
        super();
        this.state= {
            selectedUser: {}
        }
    }

    handleUser = () => {
        var user = this.props.user;
        this.props.onSelectUser(user);
    }

    render(){
        return (
            <div>
                <h1>Are you sure you would like to sign in as</h1>
                <h2>{this.props.user.userName}?</h2>
                <Link to="/">
                    <Button className="button" onClick={this.handleUser}>Confirm</Button>
                </Link>
            </div>
        );
    }
}

export default User;
